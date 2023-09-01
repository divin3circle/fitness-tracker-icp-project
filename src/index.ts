import {
  $query,
  $update,
  Record,
  StableBTreeMap,
  Vec,
  match,
  Result,
  nat64,
  ic,
  Opt,
} from "azle";
import { v4 as uuidv4 } from "uuid";

type Exercise = Record<{
  id: string;
  name: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: nat64;
}>;

type ExercisePayload = Record<{
  name: string;
  durationMinutes: number;
  caloriesBurned: number;
}>;

const exerciseStorage = new StableBTreeMap<string, Exercise>(0, 44, 1024);

$query;
export function getExercises(): Result<Vec<Exercise>, string> {
  try {
    return Result.Ok(exerciseStorage.values());
  } catch (error) {
    return Result.Err("Failed to fetch exercises");
  }
}

$query;
export function getExercise(id: string): Result<Exercise, string> {
  return match(exerciseStorage.get(id), {
    Some: (exercise) => Result.Ok<Exercise, string>(exercise),
    None: () =>
      Result.Err<Exercise, string>(`An exercise with id=${id} not found`),
  });
}

$update;
export function addExercise(
  payload: ExercisePayload
): Result<Exercise, string> {
  // Validate the payload before processing it
  if (!payload.name || !payload.durationMinutes || !payload.caloriesBurned) {
    return Result.Err<Exercise, string>("Invalid payload");
  }

  const exercise: Exercise = { id: uuidv4(), date: ic.time(), ...payload };
  try {
    exerciseStorage.insert(exercise.id, exercise);
    return Result.Ok(exercise);
  } catch (error) {
    return Result.Err("Failed to add exercise");
  }
}

$update;
export function updateExercise(
  id: string,
  payload: ExercisePayload
): Result<Exercise, string> {
  // Validate the payload before processing it
  if (!payload.name || !payload.durationMinutes || !payload.caloriesBurned) {
    return Result.Err<Exercise, string>("Invalid payload");
  }

  return match(exerciseStorage.get(id), {
    Some: (exercise) => {
      const updatedExercise: Exercise = {
        id: exercise.id,
        name: payload.name,
        durationMinutes: payload.durationMinutes,
        caloriesBurned: payload.caloriesBurned,
        date: exercise.date,
      };

      exerciseStorage.insert(exercise.id, updatedExercise);
      return Result.Ok<Exercise, string>(updatedExercise);
    },
    None: () =>
      Result.Err<Exercise, string>(
        `Couldn't update an exercise with id=${id}. Exercise not found`
      ),
  });
}

$update;
export function deleteExercise(id: string): Result<Exercise, string> {
  try {
    return match(exerciseStorage.remove(id), {
      Some: (deletedExercise) => Result.Ok<Exercise, string>(deletedExercise),
      None: () =>
        Result.Err<Exercise, string>(
          `Couldn't delete an exercise with id=${id}. Exercise not found.`
        ),
    });
  } catch (error) {
    return Result.Err<Exercise, string>(`An unexpected error occurred: ${error}`);
  }
}

$query
export function calculateTotalCaloriesBurned(): Result<number, string> {
  const exercises = exerciseStorage.values();
  if (exercises.length === 0) {
    return Result.Err("No exercises found in storage");
  }
  const totalCalories = exercises.reduce(
    (total, exercise) => total + exercise.caloriesBurned,
    0
  );
  return Result.Ok(totalCalories);
}

// Workaround for generating UUIDs
globalThis.crypto = {
  //@ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  },
};

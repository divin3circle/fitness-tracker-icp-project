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
  return Result.Ok(exerciseStorage.values());
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
  const exercise: Exercise = { id: uuidv4(), date: ic.time(), ...payload };
  exerciseStorage.insert(exercise.id, exercise);
  return Result.Ok(exercise);
}

$update;
export function updateExercise(
  id: string,
  payload: ExercisePayload
): Result<Exercise, string> {
  return match(exerciseStorage.get(id), {
    Some: (exercise) => {
      const updatedExercise: Exercise = { ...exercise, ...payload };
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
  return match(exerciseStorage.remove(id), {
    Some: (deletedExercise) => Result.Ok<Exercise, string>(deletedExercise),
    None: () =>
      Result.Err<Exercise, string>(
        `Couldn't delete an exercise with id=${id}. Exercise not found.`
      ),
  });
}

export function calculateTotalCaloriesBurned(): Result<number, string> {
  const exercises = exerciseStorage.values();
  const totalCalories = exercises.reduce(
    (total, exercise) => total + exercise.caloriesBurned,
    0
  );
  return Result.Ok(totalCalories);
}

// Workaround for generating UUIDs
globalThis.crypto = {
  getRandomValues: () => {
    let array = new Uint8Array(32);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  },
};

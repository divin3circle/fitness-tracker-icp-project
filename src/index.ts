<<<<<<< HEAD
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
=======
// cannister code goes here
import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

type Message = Record<{
    id: string;
    title: string;
    body: string;
    attachmentURL: string;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type MessagePayload = Record<{
    title: string;
    body: string;
    attachmentURL: string;
}>

const messageStorage = new StableBTreeMap<string, Message>(0, 44, 1024);

$query;
export function getMessages(): Result<Vec<Message>, string> {
    return Result.Ok(messageStorage.values());
}

$query;
export function getMessage(id: string): Result<Message, string> {
    return match(messageStorage.get(id), {
        Some: (message) => Result.Ok<Message, string>(message),
        None: () => Result.Err<Message, string>(`a message with id=${id} not found`)
    });
}

$update;
export function addMessage(payload: MessagePayload): Result<Message, string> {
    const message: Message = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    messageStorage.insert(message.id, message);
    return Result.Ok(message);
}

$update;
export function updateMessage(id: string, payload: MessagePayload): Result<Message, string> {
    return match(messageStorage.get(id), {
        Some: (message) => {
            const updatedMessage: Message = {...message, ...payload, updatedAt: Opt.Some(ic.time())};
            messageStorage.insert(message.id, updatedMessage);
            return Result.Ok<Message, string>(updatedMessage);
        },
        None: () => Result.Err<Message, string>(`couldn't update a message with id=${id}. message not found`)
    });
}

$update;
export function deleteMessage(id: string): Result<Message, string> {
    return match(messageStorage.remove(id), {
        Some: (deletedMessage) => Result.Ok<Message, string>(deletedMessage),
        None: () => Result.Err<Message, string>(`couldn't delete a message with id=${id}. message not found.`)
    });
}

// a workaround to make uuid package work with Azle
globalThis.crypto = {
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};
>>>>>>> b574dd0f40e24242465c34c9d1fd4d14ccb60fe8

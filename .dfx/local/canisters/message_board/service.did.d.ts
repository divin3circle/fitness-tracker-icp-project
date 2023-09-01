import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Exercise {
  'id' : string,
  'date' : bigint,
  'name' : string,
  'durationMinutes' : number,
  'caloriesBurned' : number,
}
export interface ExercisePayload {
  'name' : string,
  'durationMinutes' : number,
  'caloriesBurned' : number,
}
export type _AzleResult = { 'Ok' : Exercise } |
  { 'Err' : string };
export type _AzleResult_1 = { 'Ok' : number } |
  { 'Err' : string };
export type _AzleResult_2 = { 'Ok' : Array<Exercise> } |
  { 'Err' : string };
export interface _SERVICE {
  'addExercise' : ActorMethod<[ExercisePayload], _AzleResult>,
  'calculateTotalCaloriesBurned' : ActorMethod<[], _AzleResult_1>,
  'deleteExercise' : ActorMethod<[string], _AzleResult>,
  'getExercise' : ActorMethod<[string], _AzleResult>,
  'getExercises' : ActorMethod<[], _AzleResult_2>,
  'updateExercise' : ActorMethod<[string, ExercisePayload], _AzleResult>,
}

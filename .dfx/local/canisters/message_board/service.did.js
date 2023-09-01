export const idlFactory = ({ IDL }) => {
  const ExercisePayload = IDL.Record({
    'name' : IDL.Text,
    'durationMinutes' : IDL.Float64,
    'caloriesBurned' : IDL.Float64,
  });
  const Exercise = IDL.Record({
    'id' : IDL.Text,
    'date' : IDL.Nat64,
    'name' : IDL.Text,
    'durationMinutes' : IDL.Float64,
    'caloriesBurned' : IDL.Float64,
  });
  const _AzleResult = IDL.Variant({ 'Ok' : Exercise, 'Err' : IDL.Text });
  const _AzleResult_1 = IDL.Variant({ 'Ok' : IDL.Float64, 'Err' : IDL.Text });
  const _AzleResult_2 = IDL.Variant({
    'Ok' : IDL.Vec(Exercise),
    'Err' : IDL.Text,
  });
  return IDL.Service({
    'addExercise' : IDL.Func([ExercisePayload], [_AzleResult], []),
    'calculateTotalCaloriesBurned' : IDL.Func([], [_AzleResult_1], ['query']),
    'deleteExercise' : IDL.Func([IDL.Text], [_AzleResult], []),
    'getExercise' : IDL.Func([IDL.Text], [_AzleResult], ['query']),
    'getExercises' : IDL.Func([], [_AzleResult_2], ['query']),
    'updateExercise' : IDL.Func([IDL.Text, ExercisePayload], [_AzleResult], []),
  });
};
export const init = ({ IDL }) => { return []; };

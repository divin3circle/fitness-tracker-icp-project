# Fitness Tracker Canister

This is a Fitness Tracker canister deployed on the Internet Computer network. It allows you to track your workouts, manage exercise categories, set fitness goals, and retrieve workout statistics. This readme provides instructions on deploying and interacting with the canister.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Deployment](#deployment)
- [Interacting with the Canister](#interacting-with-the-canister)
- [Canister Details](#canister-details)
- [Usage](#usage)

## Prerequisites

- [DFINITY SDK](https://sdk.dfinity.org/docs/quickstart/local-quickstart.html) installed.
- Basic familiarity with the DFINITY Internet Computer.
## IMPORTANT: In an update to fix recurring bugs, I renamed the project to the default tutorial canister "message_board"

## Deployment

1. Start the local Internet Computer replica by running the following command in your terminal:
```bash
dfx start --background
```

2. Deploy the canister by executing the following command:
```bash
dfx deploy
```

3. Upon successful deployment, you'll receive URLs for interacting with the canister via the Candid interface.

## Interacting with the Canister

### Exercise Categories

- Add a new exercise category:
```bash
dfx canister call fitness_tracker addExerciseCategory (<category-id>, { name: <Category Name>, description: <Category Description> })
```

- Retrieve all exercise categories:
```bash
dfx canister call fitness_tracker getExerciseCategories
```

### Goals

- Add a new fitness goal:
```bash
dfx canister call fitness_tracker addGoal '("<goal-id>", { "target": "<Target Description>", "value": <Target Value> })'
```
- Retrieve all fitness goals:
```bash
dfx canister call fitness_tracker getGoals
```

### Workouts and Statistics

- Add a new workout:

```bash
dfx canister call fitness_tracker addWorkout '({ "date": "<Date>", "exercise": "<Exercise Name>", "duration": <Duration in Minutes>, "caloriesBurned": <Calories Burned> })'
```

- Retrieve all workouts:
```bash
dfx canister call fitness_tracker getWorkout '("<Workout ID>")'
```

- Update a workout:
```bash
dfx canister call fitness_tracker updateWorkout '("<Workout ID>", { "date": "<New Date>", "exercise": "<New Exercise Name>", "duration": <New Duration>, "caloriesBurned": <New Calories Burned> })'
```

- Delete a workout:
```bash
dfx canister call fitness_tracker deleteWorkout '("<Workout ID>")'
```

- Calculate total calories burned from all workouts:
```bash
dfx canister call fitness_tracker calculateTotalCaloriesBurned
```
- Calculate average workout duration:
```bash
dfx canister call fitness_tracker calculateAverageDuration
```

## Canister Details

- Canister Name: `fitness_tracker`
- Candid Interface URL: [Canister Interface URL](http://localhost:4943/?canisterId=<canister-id>&id=<canister-id>)

## Usage

This Fitness Tracker canister allows you to conveniently track your workouts, manage exercise categories, set fitness goals, and monitor workout statistics. To get started, follow the deployment and interaction steps provided above.

### Additional Notes

- The canister uses a StableBTreeMap data structure for workout storage. Be aware that once initialized, its configuration becomes immutable. Restart the local replica with the `--clean` flag if you make changes to its configuration.
- Customize the provided function calls with appropriate values according to your use case.

Feel free to explore the various functions offered by the canister to enhance your fitness tracking experience.

For additional details and customization, refer to the official [DFINITY SDK Documentation](https://sdk.dfinity.org/docs/index.html).



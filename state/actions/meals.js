export const ADD_MEAL = 'meals/ADD_MEAL'
export const DELETE_MEAL = 'meals/DELETE_MEAL'
export const SELECT_MEAL_FOR_DAY = 'meals/SELECT_MEAL_FOR_DAY'
export const ROTATE_MEAL_DAYS = 'meals/ROTATE_MEAL_DAYS'

const daysEnum = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function rotateDays() {
  return dispatch => {
    dispatch({ type: ROTATE_MEAL_DAYS, data: daysEnum[new Date().getDay()] })
  }
}

export function selectMealForDay(meal, day) {
  return dispatch => {
    dispatch({ type: SELECT_MEAL_FOR_DAY, data: {meal, day} })
  }
}

export function addMeal(meal) {
  return dispatch => {
    dispatch({ type: ADD_MEAL, data: meal })
  }
}

export function deleteMeal(meal) {
  return dispatch => {
    dispatch({ type: DELETE_MEAL, data: meal })
  }
}

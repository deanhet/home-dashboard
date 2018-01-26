export const ADD_MEAL = 'meals/ADD_MEAL'
export const DELETE_MEAL = 'meals/DELETE_MEAL'
export const EDIT_MEAL_DAY = 'meals/EDIT_MEAL_DAY'
export const SELECT_MEAL_FOR_DAY = 'meals/SELECT_MEAL_FOR_DAY'

export function selectMealForDay(meal) {
  return dispatch => {
    dispatch({ type: SELECT_MEAL_FOR_DAY, data: meal })
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

export function editDay(day) {
  return dispatch => {
    dispatch({ type: EDIT_MEAL_DAY, data: day })
  }
}

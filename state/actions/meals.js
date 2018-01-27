export const ADD_MEAL = 'meals/ADD_MEAL'
export const DELETE_MEAL = 'meals/DELETE_MEAL'
export const SELECT_MEAL_FOR_DAY = 'meals/SELECT_MEAL_FOR_DAY'

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

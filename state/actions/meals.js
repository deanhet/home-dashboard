import keys from "../../keys"
import { store } from "../configureStore"
import data from "./dataAction"

export const ADD_MEAL = 'meals/ADD_MEAL'
export const DELETE_MEAL = 'meals/DELETE_MEAL'
export const SET_MEALS = 'meals/SET_MEALS'
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

export function setMeals(){
  return async dispatch => {
    const response = await data(keys.meals.database)
    dispatch({ type: SET_MEALS, data: response })
  }
}

export function addMeal(meal) {
  const meals = store.getState().meals.meals
  return async dispatch => {
    const response = await data(keys.meals.database, {
      method: 'PUT',
      body: JSON.stringify([...meals, meal])
    })
    dispatch({ type: ADD_MEAL, data: meal })
  }
}

export function deleteMeal(meal) {
  const meals = store.getState().meals.meals
  return async dispatch => {
    const response = await data(keys.meals.database, {
      method: 'PUT',
      body: JSON.stringify(meals.filter((m) => m !== meal))
    })
    dispatch({ type: DELETE_MEAL, data: meal })
  }
}

import * as actions from '../actions/meals'

const initialState = {
  mealDays: [
    { day: 'Sunday', meal: null },
    { day: 'Monday', meal: null },
    { day: 'Tuesday', meal: null },
    { day: 'Wednesday', meal: null },
    { day: 'Thursday', meal: null },
    { day: 'Friday', meal: null },
    { day: 'Saturday', meal: null }
  ],
  meals:       []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_MEALS:
      return {
        ...state,
        meals: action.data
      }
    case actions.ROTATE_MEAL_DAYS:
      const dayIndex = state.mealDays.findIndex((mealDay) => mealDay.day === action.data)
      return {
        ... state, 
        mealDays: state.mealDays.concat(
          state.mealDays.splice(0, dayIndex)
        )
      }
    case actions.ADD_MEAL:
      return {
        ... state, 
        meals: [... state.meals, action.data]
      }
    case actions.DELETE_MEAL:
      return {
        ... state,
        meals: state.meals.filter((meal) => meal !== action.data)
      }
    case actions.SELECT_MEAL_FOR_DAY:
      if (action.data.day) {
        return {
          ... state,
          mealDays: state.mealDays.map((mealDay) => {
            if (mealDay.day === action.data.day) {
              mealDay.meal = action.data.meal
            }
            return mealDay
          }),
          editMealDay: null
        }
      } 
      return state
    default:
      return state
  
  }
}

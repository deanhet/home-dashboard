import * as actions from '../actions/meals'

export default function reducer(state = {
  mealDays: [
    { day: 'Sunday', meal: null },
    { day: 'Monday', meal: null },
    { day: 'Tuesday', meal: null },
    { day: 'Wednesday', meal: null },
    { day: 'Thursday', meal: null },
    { day: 'Friday', meal: null },
    { day: 'Saturday', meal: null }
  ],
  meals:       [],
  editMealDay: null
}, action = {}) {
  switch (action.type) {

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
      return {
        ... state,
        mealDays: state.mealDays.map((mealDay) => {
          if (mealDay.day === state.editMealDay) {
            mealDay.meal = action.data
          }
          return mealDay
        })
      }
    case actions.EDIT_MEAL_DAY:
      return {
        ... state, 
        editMealDay: action.data
      }
    default:
      return state
  
  }
}

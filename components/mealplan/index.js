import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, FlatList } from 'react-native'
import { Gateway } from 'react-gateway'
import { connect } from 'react-redux'
import { addMeal, deleteMeal, selectMealForDay } from '../../state/actions/meals'
import MealDay from './MealDay'
import AddMeals from './AddMeals'

export class MealPlan extends PureComponent {
  
  keyExtractor = (item, index) => item.day

  handleAddMeal = (mealName) => {
    this.props.dispatch(addMeal(mealName))
  }

  handleDeleteMeal = (mealName) => {
    this.props.dispatch(deleteMeal(mealName))
  }

  handleSelectMealForDay = (mealName) => {
    this.props.dispatch(selectMealForDay(mealName))
  }

  render() {
    const { dispatch, meals, mealDays } = this.props
    console.log(mealDays)
    return (
      <View style={style.container}>
        <FlatList
          data={mealDays}
          renderItem={({item}) => <MealDay dispatch={dispatch} data={item} />}
          keyExtractor={this.keyExtractor}
        />
        <Gateway into="modal">
          <AddMeals
            addMeal={this.handleAddMeal}
            deleteMeal={this.handleDeleteMeal}
            addMealToDay={this.handleSelectMealForDay}
            meals={meals}
          />
        </Gateway>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    mealDays: state.meals.mealDays,
    meals:    state.meals.meals
  }
}

export default connect(mapStateToProps)(MealPlan)

const style = StyleSheet.create({
  container: { 
    backgroundColor: 'rgba(50,50,50,0.6)',
    maxHeight:       400,
    padding:         15,
    margin:          15,
    overflow:        'hidden'
  },
  icon: {
    alignSelf: 'flex-end',
    height:    30,
    width:     30,
    color:     'white',
    fontSize:  30
  }
})
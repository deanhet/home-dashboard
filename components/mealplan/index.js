import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, FlatList } from 'react-native'
import { Gateway } from 'react-gateway'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { addMeal, deleteMeal, selectMealForDay, rotateDays, setMeals } from '../../state/actions/meals'
import MealDay from './MealDay'
import AddMeals from './AddMeals'

export class MealPlan extends Component {
  
  static propTypes = {
    dispatch: PropTypes.func,
    mealDays: PropTypes.array,
    meals:    PropTypes.array
  }

  state = {
    refreshList: false
  }

  componentDidMount() {
    this.dayCheck = setInterval(() => {
      this.props.dispatch(rotateDays())
    }, 3600000)
    // 1 hour
    if(!this.props.meals?.length){
      this.props.dispatch(setMeals())
    }
  }

  componentWillUnmount() {
    clearInterval(this.dayCheck)
  }

  keyExtractor = (item, index) => item.day

  handleAddMeal = (mealName) => {
    this.props.dispatch(addMeal(mealName))
  }

  handleDeleteMeal = (mealName) => {
    this.props.dispatch(deleteMeal(mealName))
  }

  handleSelectMealForDay = (mealName) => {
    this.props.dispatch(selectMealForDay(mealName, this.state.activeDay))
  }

  render() {
    const { dispatch, meals, mealDays } = this.props
    return (
      <View style={style.container}>
        <Icon name="local-dining" style={style.icon} />
        <FlatList
          data={mealDays}
          renderItem={({item}) => <MealDay 
            onSelectDay={(activeDay) => this.setState({ activeDay })}
            dispatch={dispatch} 
            data={item} 
          />}
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
    mealDays:    state.meals.mealDays,
    meals:       state.meals.meals
  }
}

export default connect(mapStateToProps)(MealPlan)

const style = StyleSheet.create({
  container: { 
    backgroundColor: 'rgba(50,50,50,0.6)',
    padding:         15,
    marginLeft:      15,
    marginRight:     15,
    overflow:        'hidden'
  },
  icon: { 
    position: 'absolute',
    fontSize: 40, 
    color:    'grey', 
    zIndex:   3 
  }
})

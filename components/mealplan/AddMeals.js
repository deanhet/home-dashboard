import React, { PureComponent } from 'react'
import { View, TextInput, StyleSheet, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import Meal from './Meal'

export default class AddMeals extends PureComponent {

  static propTypes = {
    addMeal:      PropTypes.func,
    deleteMeal:   PropTypes.func,
    addMealToDay: PropTypes.func,
    meals:        PropTypes.array
  }

  state = {
    mealInput: null
  }

  keyExtractor = (item, index) => String(index)

  onSubmit = () => {
    this.props.addMeal(this.state.mealInput)
    this.setState({
      mealInput: null
    })
  }

  deleteMeal = (mealToDelete) => {
    this.props.deleteMeal(mealToDelete)
  }

  addMealToDay = (mealToAdd) => {
    this.props.addMealToDay(mealToAdd)
  }

  render() {
    return (
      <View style={style.container}>
        <TextInput
          placeholder="Add New Meal"
          value={this.state.mealInput}
          onChangeText={(text) => this.setState({ mealInput: text })}
          onSubmitEditing={this.onSubmit}
          placeholderTextColor="grey"
          style={style.textInput}
        />
        <FlatList
          data={this.props.meals?.filter((meal) => meal).sort((a, b) => a.localeCompare(b))}
          style={{ marginTop: 15, marginBottom: 15 }}
          renderItem={({item}) => <Meal 
            data={item} 
            onDelete={this.deleteMeal}
            onMealSelect={this.addMealToDay}
          />}
          keyExtractor={this.keyExtractor}        
        />
      </View>
    )
  }

}

const style = StyleSheet.create({
  container: { 
    flex:            1, 
    height:          300, 
    width:           300, 
    backgroundColor: 'rgb(58,58,58)', 
    padding:         15 
  },
  textInput: { 
    height:               50,
    padding:              5,
    fontSize:             30,
    alignItems:           'center',
    justifyContent:       'center',
    color:                'white',
    borderBottomWidth:    1,
    borderColor:          'white'
  }
})

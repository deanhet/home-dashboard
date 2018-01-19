import React, { PureComponent } from 'react'
import { View, TextInput, StyleSheet, FlatList, AsyncStorage } from 'react-native'
import Meal from './Meal'

export default class AddMeals extends PureComponent {

  state = {
    mealInput: null,
    meals:     null
  }

  async componentDidMount() {
    const meals = await AsyncStorage.getItem('@hd:meals')
    if (!meals) {
      await AsyncStorage.setItem('@hd:meals', JSON.stringify([]))
    }
    this.setState({ meals: JSON.parse(meals) })
  }

  keyExtractor = (item, index) => index

  onSubmit = async () => {
    const updatedMeals = [this.state.mealInput, ... this.state.meals]
    await AsyncStorage.setItem('@hd:meals', JSON.stringify(updatedMeals))
    this.setState({
      mealInput: null,
      meals:     updatedMeals 
    })
  }

  deleteMeal = async (mealToDelete) => {
    const updatedMeals = this.state.meals.filter((meal) => meal !== mealToDelete)
    await AsyncStorage.setItem('@hd:meals', JSON.stringify(updatedMeals))
    this.setState({
      meals: updatedMeals
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Add New Meal"
          value={this.state.mealInput}
          onChangeText={(text) => this.setState({ mealInput: text })}
          onSubmitEditing={this.onSubmit}
          style={style.textInput}
        />
        <FlatList
          data={this.state.meals}
          style={{ marginTop: 15, marginBottom: 15 }}
          renderItem={({item}) => <Meal data={item} onDelete={this.deleteMeal} />}
          keyExtractor={this.keyExtractor}        
        />
      </View>
    )
  }

}

const style = StyleSheet.create({
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

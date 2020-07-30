import React, { useState, useRef } from 'react'
import { StyleSheet, TextInput, View, ScrollView, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Goals() {
   const [goals, setGoals] = useState(
      [
      ])

   const addGoal = (txt) => {
      if (txt.length > 0) {
         setGoals(prevGoals => (
            [...prevGoals, { body: txt, completed: false, key: nextKey }]
         ))
         input.current.clear()
         setNextKey((prevKey) => (prevKey + 1))
      }
   }

   const removeGoal = (key) => {
      setGoals(prevGoals => (prevGoals.filter(goal => goal.key != key)))
   }

   const storeGoals = async () => {
      try {
         console.log(JSON.stringify(goals))
         // await AsyncStorage.setItem('@goals', JSON.stringify(goals))
      } catch (error) {
         console.log("whoopsies")
      }
   }

   const toggleCompleted = (key) => {
      setGoals(prevGoals => (
         prevGoals.map(goal => {
            if (goal.key == key) {
               return {body: goal.body, completed: !goal.completed, key: goal.key}
            }
            else return goal
         })
      ))
   }

   const input = React.createRef()
   const [nextKey, setNextKey] = useState(0)

   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior='position'>
         <View style={styles.container}>
            <View>
               <View style={styles.titleContainer}>
                  <Text style={styles.heading}>Goals</Text>
                  <Text style={styles.numGoals}>{goals.length.toString() + " goals"}</Text>
               </View>
            </View>
            <ScrollView>
               <View>
                  {goals.length != 0 && goals.map((goal) => {
                     let textStyles = [styles.text]
                     if (goal.completed) textStyles.push({textDecorationLine: 'line-through'})
                     return (
                     <View style={styles.goalContainer}>
                        <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} onPress = {() => toggleCompleted(goal.key)}>
                           <View>
                              <TouchableOpacity onPress = {() => toggleCompleted(goal.key)}>
                                 {goal.completed ? (
                                    <Icon 
                                    name={'checkbox-marked'} 
                                    size={20} 
                                    color='#8084A4' />
                                 ) : (
                                    <Icon 
                                    name={'checkbox-blank-outline'} 
                                    size={20} 
                                    color='#8084A4' />
                                 )}
                              </TouchableOpacity>
                           </View>
                           <Text 
                              key={goal.key} 
                              style={textStyles}>
                              {goal.body}
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingHorizontal: 10}} onPress={() => removeGoal(goal.key)}>
                           <Icon name="close" size={20} color="#ff8989" />
                        </TouchableOpacity>
                     </View>
                  )})}
               </View>
               <View>
                  <TextInput
                     style={styles.input}
                     placeholder='+ Add a goal'
                     ref={input}
                     onEndEditing={(val) => addGoal(val.nativeEvent.text)}
                  />
               </View>
            </ScrollView>
         </View>
      </KeyboardAvoidingView>
   )
}

const styles = StyleSheet.create({
   container: {
      // position: 'absolute',
      // bottom: 0,
      flex: -1,
      paddingBottom: 25,
   },
   heading: {
      fontSize: 25,
      color: '#4B5189',
      fontFamily: 'Ubuntu Medium',
   },
   numGoals: {
      fontSize: 15,
      fontFamily: 'Rubik',
   },
   titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingBottom: 15,
   },
   goalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   text: {
      fontFamily: 'Rubik',
      fontSize: 18,
      color: '#8084A4',
      padding: 5,
   },
   input: {
      fontSize: 18,
      fontFamily: 'Rubik',
      color: '#8084A4'
   }
})

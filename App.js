import React, {Component} from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import {Dimensions } from "react-native";
import Moment from 'moment';
import { SimpleSurvey } from 'react-native-simple-survey';

const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';

const survey = [
  {
      questionType: 'Info',
      questionText: 'Bem-vindo ao questionário!'
  },
  {
      questionType: 'SelectionGroup',
      questionText: 'Selecione seu sexo',
      questionId: 'gender',
      options: [
          { value: 'M', optionText: 'Masculino' },
          { value: 'F', optionText: 'Feminino' },
          { value: 'O', optionText: 'Outros' },
      ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Selecione a sua faixa etária',
    questionId: 'age',
    options: [
        { value: '1',optionText: 'até 18 anos'},
        { value: '2',optionText: 'entre 18 a 23 anos'},
        { value: '3',optionText: 'entre 24 a 30 anos'},
        { value: '4',optionText: 'entre 31 a 40 anos'},
        { value: '5',optionText: 'entre 41 a 54 anos'},
        { value: '6',optionText: 'acima de 54 anos'},
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Selecione a sua Escolaridade',
    questionId: 'scholarity',
    options: [
        { value: '1',optionText: 'Ensino Fundamental incompleto'},
        { value: '2',optionText: 'Ensino Fundamental completo'},
        { value: '3',optionText: 'Ensino Médio incompleto'},
        { value: '4',optionText: 'Ensino Médio completo'},
        { value: '5',optionText: 'Ensino Superior incompleto'},
        { value: '6',optionText: 'Ensino Superior completo'},
        { value: '7',optionText: 'Pós graduação incompleta'},
        { value: '8',optionText: 'Pós graduação completa'},
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Como você sente-se em relação ao questionário?',
    questionId: 'sentiment',
    options: [
        { value: '1',optionText: 'Muito satisfesto'},
        { value: '2',optionText: 'Satisfeito'},
        { value: '3',optionText: 'Pouco satisfeito'},
        { value: '4',optionText: 'Insatisfeito'},
    ]
  }
];

class SurveyScreen extends Component {
  static navigationOptions = () => {
      return {
          headerStyle: {
              backgroundColor: GREEN,
              height: 40,
              elevation: 5,
          },
          headerTintColor: '#fff',
          headerTitle: 'Sample Survey',
          headerTitleStyle: {
              flex: 1,
          }
      };
  }

  constructor(props) {
      super(props);
      this.state = { 
        answersSoFar: '' };
  }

  onSurveyFinished(answers) {
      const infoQuestionsRemoved = [...answers];

      // Convert from an array to a proper object. This won't work if you have duplicate questionIds
      const answersAsObj = {};
      for (const elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }

      alert(JSON.stringify(answersAsObj));
      // this.props.navigation.navigate('SurveyCompleted', { surveyAnswers: answersAsObj });
  }

  /**
   *  After each answer is submitted this function is called. Here you can take additional steps in response to the 
   *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is 
   *  is restricted (age, geo-fencing) from your app.
   */
  onAnswerSubmitted(answer) {
      this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
      switch (answer.questionId) {
          case 'favoriteColor': {
              // do something
              break;
          }
          default:
              break;
      }
  }

  renderPreviousButton(onPress, enabled) {
      return (
          <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
              <Button
                  color={GREEN}
                  onPress={onPress}
                  disabled={!enabled}
                  backgroundColor={GREEN}
                  title={'Anterior'}
              />
          </View>
      );
  }

  renderNextButton(onPress, enabled) {
      return (
          <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
              <Button
                  color={GREEN}
                  onPress={onPress}
                  disabled={!enabled}
                  backgroundColor={GREEN}
                  title={'Próximo'}
              />
          </View>
      );
  }

  renderFinishedButton(onPress, enabled) {
      return (
          <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
              <Button
                  title={'Finalizar'}
                  onPress={onPress}
                  disabled={!enabled}
                  color={GREEN}
              />
          </View>
      );
  }

  renderButton(data, index, isSelected, onPress) {
      return (
          <View
              key={`selection_button_view_${index}`}
              style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
          >
              <Button
                  title={data.optionText}
                  onPress={onPress}
                  color={isSelected ? GREEN : PURPLE}
                  style={isSelected ? { fontWeight: 'bold' } : {}} 
                  key={`button_${index}`}
              />
          </View>
      );
  }

  renderQuestionText(questionText) {
      return (
          <View style={{marginLeft: 10, marginRight: 10 }}>
              <Text numLines={1} style={styles.questionText}>{questionText}</Text>
          </View>
      );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
      return (
          <View>
              <TextInput
                  style={styles.textBox}
                  onChangeText={text => onChange(text)}
                  numberOfLines={1}
                  underlineColorAndroid={'white'}
                  placeholder={placeholder}
                  placeholderTextColor={'rgba(184,184,184,1)'}
                  value={value}
                  multiline
                  onBlur={onBlur}
                  blurOnSubmit
                  returnKeyType='done'
              />
          </View>
      );
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
      return (<TextInput 
          style={styles.numericInput}
          onChangeText={text => { onChange(text); }}
          underlineColorAndroid={'white'}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={String(value)}
          placeholder={placeholder}
          keyboardType={'numeric'}
          onBlur={onBlur}
          maxLength={3}
      />);
  }

  renderInfoText(infoText) {
      return (
          <View style={{ marginLeft: 10, marginRight: 10 }}>
              <Text style={styles.infoText}>{infoText}</Text>
          </View>
      );
  }

  render() {
      return (
          <View style={[styles.background]}>
              <View style={styles.container}>
                  <SimpleSurvey
                      ref={(s) => { this.surveyRef = s; }}
                      survey={survey}
                      renderSelector={this.renderButton.bind(this)}
                      containerStyle={styles.surveyContainer}
                      selectionGroupContainerStyle={styles.selectionGroupContainer}
                      navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                      renderPrevious={this.renderPreviousButton.bind(this)}
                      renderNext={this.renderNextButton.bind(this)}
                      renderFinished={this.renderFinishedButton.bind(this)}
                      renderQuestionText={this.renderQuestionText}
                      onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
                      onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
                      renderTextInput={this.renderTextBox}
                      renderNumericInput={this.renderNumericInput}
                      renderInfo={this.renderInfoText}
                  />
                  
              </View>              
          </View>
      );
  }
}

const styles = StyleSheet.create({
  button: {
      margin: 10,
      height: 30,
      width: 140,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  
  container: {
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surveyContainer: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      backgroundColor: 'white',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      alignContent: 'center',
      padding: 5,
      flexGrow: 0,
      elevation: 20,
  },
  selectionGroupContainer: {
      flexDirection: 'column',
      backgroundColor: 'white',
      alignContent: 'flex-end',
  },
  navButtonText: {
      margin: 10,
      fontSize: 20,
      color: 'white',  
      width: 'auto'
  },
  answers: {
      alignSelf: 'center',
      marginBottom: 10,
  },
  navigationButton: {
      
      minHeight: 40,
      backgroundColor: GREEN,
      padding: 0,
      borderRadius: 100,
      marginTop: 5,
      justifyContent: 'center',
      alignItems: 'center',
  },
  
  background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  questionText: {
      width: '100%',
      marginBottom: 20,
      fontSize: 20
  },
  textBox: {
      borderWidth: 1,
      borderColor: 'rgba(204,204,204,1)',
      backgroundColor: 'white',
      borderRadius: 10,
      
      padding: 10,
      textAlignVertical: 'top',
      marginLeft: 10,
      marginRight: 10
  },
  numericInput: {
      borderWidth: 1,
      borderColor: 'rgba(204,204,204,1)',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      textAlignVertical: 'top',
      marginLeft: 10,
      marginRight: 10
  },
  infoText: {
      marginBottom: 20,
      fontSize: 20,
      marginLeft: 10
  },
});

export default function App() {
  const [timeNow, setTimeNow] = React.useState('');

  React.useEffect(() => {
    setInterval(() => {
      setTimeNow(getTimeNow());
    }, 1000);
  }, [])

  const getTimeNow = () => {
    return Moment().format('hh:mm:ss');
  }
  return (
    <View style={styles.container}>
      <SurveyScreen></SurveyScreen>
    </View>
  );
}
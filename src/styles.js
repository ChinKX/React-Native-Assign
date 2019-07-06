import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

export default StyleSheet.create({
  container: {
    backgroundColor: '#4c69a5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
  },
  logo: {
    height: 60,
    width: 300,
    resizeMode: 'contain',
    marginBottom: 0,
    padding: 10,
    marginTop: 130
  },
  buttonContainer: {
    backgroundColor: '#f7c744',
    paddingVertical: 15,
    marginTop: 8,
    width:window.width -100,
    height: 50
  },
  buttonText: {
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16
  },
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
  },
});

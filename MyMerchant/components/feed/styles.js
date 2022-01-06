import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        paddingTop: 40
    },
    logo: {
        width: 66,
        height: 55
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 60
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    text_bold: {
        fontWeight: '700',
        fontSize: 20
    },
    input: {
        height: 50,
        width: 300,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
        borderRadius: 50,
        textAlign: 'center'
    },
    button: {
        height: 50,
        width: 300,
        backgroundColor: '#48BBEC',
        alignItems: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});

export default styles;
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        paddingTop: 100
    },
    input: {
        height: 50,
        width: 300,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
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
    }
});

export default styles;
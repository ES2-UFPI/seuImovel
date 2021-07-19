import { StackActions } from '@react-navigation/native';


export default function logout({ navigation }){
    return(
        navigation.dispatch(StackActions.popToTop())

    )
}
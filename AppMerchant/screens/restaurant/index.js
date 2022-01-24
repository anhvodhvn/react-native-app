import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { icons, COLORS, SIZES, FONTS } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2
  }
});

function Restaurant({ route, navigation }) {
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  function getOrderQty(menuId) {
    let orderItem = orderItems.filter(a => a.menuId == menuId);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0
  };

  function getBasketItemCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemCount;
  };

  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return total.toFixed(2);
  };

  useEffect(() => {
    let { item, currentLocation } = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  });

  const Header = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ width: 50, paddingLeft: SIZES.padding * 2, justifyContent: 'center' }}
                          onPress={() => { navigation.goBack(); }}>
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3
            }}
          >
            <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
          </View>
        </View>        
        
        <TouchableOpacity style={{ width: 50, paddingRight: SIZES.padding * 2, justifyContent: 'center' }}>
          <Image source={icons.list} resizeMode='contain' style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
    );
  };

  const FoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } }
        ], { useNativeDriver: false })}
      >
        {
          restaurant?.menu.map((item, index) => (
            <View key={`menu-${index}`} style={{ alignItems: 'center' }}>
              <View style={{ height: SIZES.height * 0.35 }}>
                {/* Food Image */}
                <Image  source={item.photo} 
                        resizeMode='cover'
                        style={{
                          width: SIZES.width,
                          height: '100%'
                        }}
                />
                
                {/* Quantity */}
                <View 
                  style={{
                    position: 'absolute',
                    bottom: - 20,
                    width: SIZES.width,
                    height: 50,
                    justifyContent: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 50,
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25
                    }}
                    onPress={() => editOrder('-', item.menuId, item.price)}
                  >
                    <Text style={{ ...FONTS.body1 }}>-</Text>
                  </TouchableOpacity>
                  
                  <View
                    style={{
                      width: 50,
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                      <Text style={{ ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      width: 50,
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopRightRadius: 25,
                      borderBottomRightRadius: 25
                    }}
                    onPress={() => editOrder('+', item.menuId, item.price)}
                  >
                    <Text style={{ ...FONTS.body1 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Name & Description */}
              <View
                style={{
                  width: SIZES.width,
                  alignItems: 'center',
                  marginTop: 15,
                  paddingHorizontal: SIZES.padding * 2
                }}
              >
                <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{item.name} - {item.price.toFixed(2)}</Text>
                <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
              </View>
                
              {/* Calories */}
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Image source={icons.fire} style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={{...FONTS.body3, color: COLORS.darygray}}>{item.calories.toFixed(2)}
                  cal
                </Text>
              </View>
            </View>
          ))
        }
      </Animated.ScrollView>
    );
  };

  const Dots = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Dots</Text>
      </View>
    );
  };

  const Order = () => {
    return (
      <View>
        <Dots />
        
        <View 
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40 
            }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1
            }}
          >
            <Text style={{ ...FONTS.h3 }}>{getBasketItemCount()} items in Cart</Text>
            <Text style={{ ...FONTS.h3 }}>${sumOrder()}</Text>
          </View>          

          <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: SIZES.padding * 2,
                paddingHorizontal: SIZES.padding * 3
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.pin}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.darkgray
                }}
              />
              <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>Location</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.master_card}
                resizeMode='contain'
                style={{ width: 20, height: 20, tintColor: COLORS.darkgray }}
              />
              <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>8888</Text>
            </View>
          </View>

          {/* Order Button */}
          <View style={{ padding: SIZES.padding * 2, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                borderRadius: SIZES.radius,
              }}
              onPress={() => navigation.navigate('OrderDelivery', {
                restaurant: restaurant,
                currentLocation: currentLocation
              })}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {
          isIphoneX() && 
            <View
              style={{
                position: 'absolute',
                bottom: -34,
                left: 0,
                right: 0,
                height: 34,
                backgroundColor: COLORS.white
            }}>
            </View>
        }
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FoodInfo />
      <Order />  
    </SafeAreaView>
  );
}

export default Restaurant;

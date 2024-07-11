import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

function ChooseCat() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation(); 

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / width);
    setActiveIndex(currentIndex);
  };

  const dotPosition = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: [0, 1, 2],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Choose Category</Text>
        <Text style={styles.heading2}>For seemless experience!</Text>
      </View>
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.cardContainer}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        <View style={styles.card}>
          <Image
            source={require('../assets/Onlineworld.gif')}
            style={styles.image}
          />
          <Text style={styles.boldText}>Owner</Text>
          <View style={styles.textOuterContainer}>
            <Text style={styles.textpara}>
              Our platform allows you to add trucks, monitor drivers, and hire new drivers effortlessly. 
              Keep an eye on your trucks in real-time and leverage our marketing tools to enhance your operations.
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('') }>
            <Text style={styles.buttonText}>Choose</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <Image
            source={require('../assets/bus_driver.gif')}
            style={styles.image}
          />
          <Text style={styles.boldText}>Driver</Text>
          <View style={styles.textOuterContainer}>
            <Text style={styles.textpara}>
              Get hired easily and navigate your routes with ease. Manage your jobs efficiently and monitor the product you're transporting.
            </Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Choose</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <Image
            source={require('../assets/Windows-rafiki.png')}
            style={styles.image}
          />
          <Text style={styles.boldText}>User</Text>
          <View style={styles.textOuterContainer}>
            <Text style={styles.textpara}>
              Book trucks conveniently and track your product in real-time. Enjoy easy booking and a secured connection for all your transactions.
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('UserLogin') }>
            <Text style={styles.buttonText}>Choose</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.pagination}>
        {[0, 1, 2].map((_, i) => {
          const opacity = dotPosition.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const scale = dotPosition.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.8, 1.4, 1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View 
              key={i} 
              style={[
                styles.dot, 
                { opacity, transform: [{ scale }] },
                activeIndex === i && styles.activeDot
              ]}
            >
              {activeIndex === i && <View style={styles.innerDot} />}
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer:{
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#FFF1F1',  
  },
  heading:{
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
  },
  heading2:{
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textpara: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 50,
  },
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    width: width - 32,
    height: height - 170, // Adjust height to leave space for header and button
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  image: {
    width: 265,
    height: 250,
    marginBottom: 25,
  },
  boldText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: -30,
  },
  textOuterContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
    bottom: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: { 
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30, // Adjust this value based on your layout needs
    left: 0,
    right: 0,
  },
  dot: {
    height: 12,
    width: 12,
    backgroundColor: '#C3C3C3',
    borderRadius: 10,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#620707',
  },
  innerDot: {
    height: 6,
    width: 6,
    backgroundColor: '#620707',
    borderRadius: 3,
  },
});

export default ChooseCat;

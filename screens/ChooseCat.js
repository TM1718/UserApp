import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

function ChooseCat() {
  const tickIcon = 'https://img.icons8.com/ios-filled/50/26e07f/checkmark.png';
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation(); 
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / width);
    setActiveIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pick a Category</Text>
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.cardContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://purepng.com/public/uploads/large/purepng.com-trucktruckpickup-truckbig-trucktrucks-1701527681534kbj6m.png' }}
            style={styles.image}
          />
          <Text style={styles.boldText}>Owner</Text>
          <View style={styles.textOuterContainer}>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Add trucks</Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Monitor drivers</Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Hire Driver</Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Monitor Trucks</Text>
              </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Choose</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/027/309/183/small_2x/driver-with-ai-generated-free-png.png' }}
            style={styles.image2}
          />
          <Text style={styles.boldText}>Driver</Text>
          <View style={styles.textOuterContainer}>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Get hired</Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Easy Navigation</Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Easy job management</Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Monitor product</Text>
              </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Choose</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/R.2b90add718221d91a5b48f2fb88d012a?rik=FYL%2fW79homI3Jw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_552555.png&ehk=qbsK1y2W2OXIDJX2qDIvEZMj%2fAa%2bNZxslVAguvc72gs%3d&risl=&pid=ImgRaw&r=0' }}
            style={styles.image3}
          />
          <Text style={styles.boldText}>User</Text>
          <View style={styles.textOuterContainer}>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Book trucks</Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Track Product</Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Easy booking</Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={{ uri: tickIcon }} style={styles.tickIcon} />
                <Text style={styles.text}>Secured connection</Text>
              </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('UserLogin') }>
            <Text style={styles.buttonText}>Choose</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.pagination}>
        <View style={[styles.dot, activeIndex === 0 && styles.activeDot]} />
        <View style={[styles.dot, activeIndex === 1 && styles.activeDot]} />
        <View style={[styles.dot, activeIndex === 2 && styles.activeDot]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 76,
  },
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    width: width - 32,
    height: height - 170, // Adjust height to leave space for header and button
    backgroundColor: '#F0EBEB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  image2: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  image3: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  boldText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textOuterContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center', 
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    marginBottom: 4,
    justifyContent: 'flex-start',
  },
  tickIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  text: {
    fontSize: 20,
    color: '#8B5454',
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#C3C3C3',
    borderRadius: 5,
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: '#620707',
  },
});

export default ChooseCat;

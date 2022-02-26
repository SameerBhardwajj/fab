import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

// Custom Imports
import {colors, fontSizes} from '../../utils';
import {CustomFavorite} from '../../components';

export interface AppProps {
  item: any;
  onBack: Function;
  like: boolean;
  setLike: Function;
}

export default function DetailsModal(props: AppProps) {
  const height = props.item.urlToImage ? 300 : 100;
  const backgroundColor = props.item.urlToImage ? colors.black : colors.white;

  return (
    <View style={Styles.mainView}>
      <ImageBackground
        source={{uri: props.item.urlToImage}}
        imageStyle={{height, backgroundColor}}
        style={{height, backgroundColor}}
        resizeMode="cover">
        <LinearGradient
          style={{height}}
          colors={[
            colors.transparent,
            colors.transparent,
            colors.transparent,
            props.item.urlToImage ? colors.white : colors.transparent,
          ]}
          locations={[0, 0.3, 0.6, 1]}>
          <View style={Styles.headerView}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.onBack()}>
              <Avatar.Icon
                size={60}
                icon="chevron-left"
                theme={{colors: {primary: colors.modalBg}}}
              />
            </TouchableOpacity>
            <CustomFavorite like={props.like} setLike={props.setLike} />
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={Styles.contentView}>
        <Text
          style={[
            Styles.heading,
            {
              top: props.item.urlToImage ? -30 : 0,
              paddingBottom: props.item.urlToImage ? 0 : 30,
            },
          ]}>
          {props.item.title}
        </Text>
        <Text style={Styles.author}>
          <Text style={Styles.txt}>Date : </Text>
          {moment(props.item.publishedAt).format('d MMM, YY [at] h:m A')}
        </Text>
        <Text style={Styles.author}>
          <Text style={Styles.txt}>Source : </Text>
          {props.item.source.name}
        </Text>
        {props.item.author && (
          <Text style={Styles.author}>
            <Text style={Styles.txt}>Author : </Text>
            {props.item.author}
          </Text>
        )}
        <Text
          style={[
            Styles.author,
            {paddingVertical: 10, fontSize: fontSizes.content},
          ]}>
          {props.item.description}
          {props.item.content}
        </Text>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  btn: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
  contentView: {
    margin: 20,
    marginTop: 0,
  },
  heading: {
    color: colors.black,
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
  },
  author: {
    color: colors.black,
    fontSize: fontSizes.sub_heading,
    fontWeight: 'bold',
    paddingVertical: 2,
  },
  txt: {fontWeight: '600'},
});

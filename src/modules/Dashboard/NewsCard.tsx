import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';
import moment from 'moment';

// Custom Imports
import {colors, fontSizes} from '../../utils';
import DetailsModal from './DetailsModal';
import {CustomFavorite} from '../../components';

export interface AppProps {
  item: any;
}

export default function NewsCard(props: AppProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [like, setLike] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={e => {
        e.stopPropagation();
        setModalVisible(true);
      }}>
      <ImageBackground
        source={{uri: props.item.urlToImage}}
        imageStyle={Styles.imgStyle}
        style={[Styles.mainView, {backgroundColor: colors.black}]}
        resizeMode="cover">
        <View style={Styles.headerTxtView}>
          <View>
            <Text numberOfLines={5} style={Styles.heading}>
              {props.item.title}
            </Text>
            {props.item.author && (
              <Text
                numberOfLines={1}
                style={[
                  Styles.author,
                  {paddingVertical: 10, textAlign: 'right'},
                ]}>
                By {props.item.author}
              </Text>
            )}
          </View>
          <View style={Styles.contentView}>
            <View style={{width: '80%'}}>
              <Text style={Styles.author}>
                <Text style={{fontWeight: '600'}}>Date : </Text>
                {moment(props.item.publishedAt).format('d MMM, YY [at] h:m A')}
              </Text>
              <Text style={Styles.author}>
                <Text style={{fontWeight: '600'}}>Source : </Text>
                {props.item.source.name}
              </Text>
            </View>
            <CustomFavorite like={like} setLike={() => setLike(!like)} />
          </View>
        </View>
      </ImageBackground>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        style={{flex: 1}}>
        <DetailsModal
          like={like}
          setLike={() => setLike(!like)}
          item={props.item}
          onBack={() => setModalVisible(false)}
        />
      </Modal>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    width: '85%',
    borderRadius: 20,
    height: 300,
    alignSelf: 'center',
    marginBottom: 20,
  },
  imgStyle: {
    borderRadius: 20,
    width: '100%',
    height: 300,
    opacity: 0.5,
  },
  headerTxtView: {
    padding: 20,
    justifyContent: 'space-between',
    height: 300,
  },
  heading: {
    color: colors.white,
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    color: colors.white,
    fontSize: fontSizes.sub_heading,
    fontWeight: 'bold',
    paddingVertical: 2,
  },
});

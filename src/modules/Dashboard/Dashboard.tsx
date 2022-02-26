import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Paragraph, Dialog, Portal, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

// Custom Imports
import {colors, fontSizes} from '../../utils';
import {getNewsApi} from './actions';
import NewsCard from './NewsCard';
import {getLogin} from '../Login/actions';

export interface AppProps {}

export default function Dashboard(props: AppProps) {
  const dispatch = useDispatch();
  const {newsData} = useSelector((state: {Dashboard: any}) => ({
    newsData: state.Dashboard.newsData,
  }));

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getLatestNews(1);
  }, []);

  const getLatestNews = (page: number) => {
    let payload = {
      q: 'india',
      to: '2022-02-26',
      sortBy: 'publishedAt',
      apiKey: '9a99f910e4574db2bf82664a88ce8ce6',
      language: 'en',
      pageSize: 10,
      page: page,
    };
    dispatch(
      getNewsApi(
        payload,
        () => {
          setPage(page + 1);
          setLoading(false);
          setRefreshing(false);
        },
        () => {
          setLoading(false);
          setRefreshing(false);
        },
      ),
    );
  };

  async function removeUserSession() {
    setVisible(false);
    try {
      await EncryptedStorage.removeItem('user_session');
      dispatch(getLogin({}, () => {}));
    } catch (error) {
      dispatch(getLogin({}, () => {}));
    }
  }

  const renderItem = (rowData: {item: Object; index: number}) => {
    const {item, index} = rowData;
    return <NewsCard item={item} />;
  };

  return (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.headerView}>
        <View style={{width: 45}} />
        <Text style={Styles.headerTxt}>NEWS HEADLINES</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{top: 0, right: 20}}
          onPress={() => setVisible(true)}>
          <Avatar.Icon size={45} icon="logout" theme={{colors: {}}} />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={newsData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          getLatestNews(1);
        }}
        onEndReached={() => {
          page !== 1 ? (setLoading(true), getLatestNews(page)) : null;
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading && page !== 1 ? (
            <ActivityIndicator animating color={colors.violet} size="large" />
          ) : null
        }
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{backgroundColor: colors.white}}>
          <Dialog.Content>
            <Paragraph style={{textAlign: 'center'}}>
              Do you want to Logout ?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions
            style={{justifyContent: 'space-evenly', paddingBottom: 30}}>
            <Button mode="outlined" onPress={() => removeUserSession()}>
              Ok
            </Button>
            <Button mode="contained" onPress={() => setVisible(false)}>
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
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
  },
  headerTxt: {
    fontSize: fontSizes.heading,
    color: colors.violet,
    padding: 20,
    fontWeight: 'bold',
  },
});

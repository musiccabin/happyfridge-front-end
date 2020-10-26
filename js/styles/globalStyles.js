import { StyleSheet } from 'react-native'

const COLORS = {
  PRIMARY: '#ffb846',
  SECONDARY: '#ff7b5c',
  PRIMARY_FONT: '#333333',
  SECONDARY_FONT: '#575757',
  WHITE: '#ffffff',
  BLACK: '#000000',
  PRIMARY_ICON: '#ffd188',
  SECONDARY_ICON: '#ff9f88',
  BACKGROUND: '#f4f4f4',
}

const globalStyles = StyleSheet.create({
  card: {
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    paddingVertical: 5,
    fontSize: 18,
  },
  cardImage: {
    height: '100%',
    width: 'auto',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    padding: 10,
    backgroundColor: COLORS.WHITE,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardDetails: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTimer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clock: {
    paddingRight: 5,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    paddingRight: 10,
  },
})

export { globalStyles, COLORS }

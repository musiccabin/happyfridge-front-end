import { StyleSheet } from 'react-native'

const COLORS = {
  PRIMARY: '#ffb846',
  SECONDARY: '#ff7b5c',
  PRIMARY_FONT: '#333333',
  SECONDARY_FONT: '#575757',
  WHITE: '#ffffff',
  PRIMARY_ICON: '#ffd188',
  SECONDARY_ICON: '#ff9f88',
  BACKGROUND: '#f4f4f4',
}

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  card: {
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.15,
    shadowColor: '#747474',
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  titleXL: {
    fontSize: 20,
    color: COLORS.PRIMARY_FONT,
  },
  titleL: {
    fontSize: 18,
    color: COLORS.PRIMARY_FONT,
  },
  titleM: {
    fontSize: 16,
    color: COLORS.PRIMARY_FONT,
  },
  titleS: {
    fontSize: 14,
    color: COLORS.SECONDARY_FONT,
  },
  cardImage: {
    resizeMode: 'cover',
  },
  cardInfo: {
    padding: 10,
  },
  cardDetails: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
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

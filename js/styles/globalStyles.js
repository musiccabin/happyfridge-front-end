import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

const COLORS = {
  PRIMARY: '#ffb846',
  SECONDARY: '#ff7b5c',
  PRIMARY_FONT: '#333333',
  SECONDARY_FONT: '#575757',
  WHITE: '#ffffff',
  PRIMARY_ICON: '#ffd188',
  SECONDARY_ICON: '#ff9f88',
  BACKGROUND: '#f4f4f4',
  SEPARATOR: '#bfbfbf',
}

const zeroMargins = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
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
  anchorText: {
    fontSize: 14,
    color: COLORS.SECONDARY
  },
  cardImage: {
    resizeMode: 'cover',
  },
  cardInfo: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
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
  iconSize: 18,
  label: {
    marginBottom: 5,
    marginLeft: 5,
    fontSize: 14,
    color: COLORS.PRIMARY_FONT,
  },
  pickerLabel: {
    marginLeft: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 32,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    color: COLORS.PRIMARY_FONT,
  },
  picker: {
    height: 40,
    marginVertical: 0,
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  inputWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: 10,
  },
  full: {
    width: '100%',
  },
  half: {
    width: '50%',
  },
  small: {
    width: '20%',
  },
  medium: {
    width: '30%',
  },
  pinCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteCenterContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    ...zeroMargins,
  },
  circle: {
    right: -(100 / 2),
    left: -(100 / 2),
    width: windowWidth + 100,
    height: windowWidth + 100,
    borderRadius: windowWidth + 100 / 2,
    backgroundColor: COLORS.PRIMARY_ICON,
    zIndex: -1,
  },
  navHeaderWrapper: {
    marginVertical: 30,
  },
  navHeaderTitle: {
    fontSize: 20,
    color: COLORS.PRIMARY_FONT,
    fontWeight: '300',
  },
})

export { globalStyles, COLORS, windowWidth }

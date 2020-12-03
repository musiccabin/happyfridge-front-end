import { StyleSheet } from 'react-native'
import { adjuster, windowWidthAdjuster } from '../utils'

const COLORS = {
  PRIMARY: '#ffb846',
  SECONDARY: '#ff7b5c',
  PRIMARY_FONT: '#333333',
  SECONDARY_FONT: '#575757',
  WHITE: '#ffffff',
  PRIMARY_ICON: '#ffd188',
  SECONDARY_ICON: '#ff9f88',
  BACKGROUND: '#f4f4f4',
  RED: '#ff7a5c',
}

const zeroMargins = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
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
  pinCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  absoluteCenterContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    ...zeroMargins
  },
  circle: {
    right: -(adjuster / 2),
    left: -(adjuster / 2),
    width: windowWidthAdjuster,
    height: windowWidthAdjuster,
    borderRadius: windowWidthAdjuster / 2,
    backgroundColor: COLORS.PRIMARY_ICON,
    zIndex: -1
  }
})

export { globalStyles, COLORS }

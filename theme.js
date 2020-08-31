const theme = {
  primaryColor: '#0070f3',
  lightPrimaryColor: '#aebfe4',
  secondaryColor: '#0070f3',
  lightSecondaryColor: '#c9ecdf',
  successColor: '#3ead87',
  dangerColor: 'rgb(246, 119, 119)',
  lightDangerColor: '#f9a7a7',
  warningColor: 'rgb(255, 235, 148)',
  lightWarningColor: '#fff0ad',
  white: '#ffffff',
  bodyFont: "'Rubik', sans-serif",
  headerFont: "'Rubik', sans-serif",

  fontSize: '1.1rem',
  borderRadius: '50px',
  backgroundColor: '#ffffff',
  backgroundTextColor: '#334150',
  backgroundColorDark: '#040d14',
  backgroundTextColorDark: '#6b7682',

  columns: 12,
  /** phone range */
  xs: '320px',
  sm: '700px',
  /** tablet range */
  md: '768px',
  lg: '1024px',
  /** desktop range */
  xl: '1280px',
  xxl: '1920px',

  gridXsWidth: '100%',
  gridSmWidth: '100%',
  gridMdWidth: '900px',
  gridLgWidth: '1050px',
  gridXlWidth: '1150px',
  gridXxlWidth: '1521px',

  gutterXs: '18px',
  gutterSm: '18px',
  gutterMd: '18px',
  gutterLg: '18px',
  gutterXl: 'auto',
  gutterXxl: 'auto',

  inputFocusBorderPrimary: '0 0 0 0.2rem rgba(110, 148, 228, 0.3)',
  inputFocusBorderSecondary: '0 0 0 0.2rem lighten($secondary-color, 5%)',
  inputFocusBorderSuccess: '0 0 0 0.2rem lighten($success-color, 5%)',
  inputFocusBorderWarning: '0 0 0 0.2rem lighten($warning-color, 5%)',
  inputFocusBorderDanger: '0 0 0 0.2rem lighten($danger-color, 5%)',
  inputFontColor: '#202b33',
  inputBorderRadius: '4px',
  inputPadding: `${1.1 * 0.65}rem ${1.1 * 0.775}rem`,
  inputPrimaryFocusBorder: '0 0 0 0.2rem rgba(110, 148, 228, 0.3)',
  inputBackgroundColor: '#f4f5f7',
  inputBorder: 0,
  inputFontWeight: 700,

  selectBorderRadius: '4px',
  selectBorder: 0,

  buttonPadding: `12px 30px`,
  buttonShadow: '0px 5px 9.5px 0.5px rgba(61, 95, 131, 0.27)',
  buttonShadowDepressed:
    '0 0 0 0.5px rgba(50, 50, 93, 0.15), 0 2px 5px 0 rgba(50, 50, 93, 0.08), 0 1px 1.5px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 0 0 0 transparent',
  buttonBorderRadius: '4px',

  cardShadow: 'none',
  cardShadowHover: '0px 13px 38px -15px rgba(24,38,107,0.49)',
  cardPadding: '25px',
  cardBackgroundColor: '#ffffff',

  flashMargin: '10px auto',
  flashPadding: '16px',
  flashBorderRadius: '4px',

  inputRangeFontFamily: "'Lekton', san-serif",
  inputRangePrimaryColor: '#57c59b',
  inputRangeNeutralColor: '#aaaaaa',
  inputRangeNeutralLightColor: '#e1e7eb',
  inputRangeDisabledColor: '#cccccc',

  // input-range-slider
  inputRangeSliderBackground: 'white',
  inputRangeSliderBorder: '1px solid white',
  inputRangeSliderFocusBoxShadowRadius: '5px',
  inputRangeSliderFocusBoxShadowColor: `transparentize(white, 0.8)`,
  inputRangeSliderHeight: '25px',
  inputRangeSliderWidth: '25px',
  inputRangeSliderTransition:
    'transform 0.1s cubic-bezier(0.3, 0, 0.45, 1), box-shadow 0.1s cubic-bezier(0.3, 0, 0.45, 1)',
  inputRangeSliderContainerTransition: 'left 0.1s cubic-bezier(0.3, 0, 0.45, 1)',
  inputRangeSliderActiveTransform: 'scale(1.3)',
  inputRangeSliderDisabledBackground: `#cccccc`,
  inputRangeSliderDisabledBorder: `1px solid #cccccc`,

  // input-range-label
  inputRangeSabelColor: `#aaaaaa`,
  inputRangeSabelFontSize: '16px',
  inputRangeSabelPositionBottom: '-1.4rem',
  inputRangeSabelValuePositionTop: '-40px',

  // input-range-track
  inputRangeTrackBackground: `#e1e7eb`,
  inputRangeTrackHeight: '0.3rem',
  inputRangeTrackTransition: 'left 0.1s cubic-bezier(0.3, 0, 0.45, 1), width 0.1s cubic-bezier(0.3, 0, 0.45, 1)',
  inputRangeTrackActiveBackground: `#57c59b`,
  inputRangeTrackDisabledBackground: `#e1e7eb`,
};

export default theme;

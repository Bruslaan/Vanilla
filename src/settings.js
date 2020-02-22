module.exports = {

    title: 'Vanilla',
  
    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: false,
  
    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    sidebarLogo: false,

    eventColorMapping: {
      "Anwesenheit": {
        "Arbeit": "#4C95FF"
      },
      "Abwesenheit": {
        "Urlaub": "#FFB63D",
        "Krankheit":"#A43DFF",
        "Feiertag": "#52FF3D",
      },
      "Default": "#C5C5C5"
    }

    
  }
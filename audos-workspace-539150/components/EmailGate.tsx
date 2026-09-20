import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  X,
  Sparkles,
  BookOpen,
  Loader2,
  ChevronLeft,
  Smartphone,
  Layers,
  Check,
  CheckCircle2,
  Upload,
  Target,
  GraduationCap,
  LineChart,
} from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import type { DesktopThemeTokens } from '../types';
import { isValidEmailFormat, INVALID_EMAIL_MESSAGE } from '../lib/emailValidation';
import BrandSplash from './BrandSplash';
import BrandLogoMark from './BrandLogoMark';
import {
  AuthServiceStatus,
  beginSocialOAuth,
  completeSocialOAuthCallback,
  composeE164,
  DEFAULT_PHONE_COUNTRY,
  fetchAuthServiceStatus,
  isFacebookLoginConfigured,
  isGoogleLoginConfigured,
  isLinkedInLoginConfigured,
  PHONE_COUNTRY_CODES,
  SOCIAL_OAUTH_SUCCESS_PATH,
  smsSendOtp,
  smsVerifyOtp,
} from '../lib/authAccount';
import { prefetchCasemateEntitlement } from '../lib/proAccess';
import { formatVnd, PRICING_PLANS } from '../lib/pricing';
const mujiProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAACFABp+ABh6AAqBABmBABmCABmDABmDABl9ABd+ABeqAAD/AACCABhxACeJABNVAAB+ABh+ABg/AAB9ABiNACN+ABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABfBVYjAAAAQHRSTlMA/PsI05JPM7KLdQMBbgYQA1QqBMsMqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGDN5QAAA4FJREFUeNrtmYuO4yAMRe3wDAklSWf2/z91fQ19jdTR7kpDIm3cKgFClSNjG+MSnXLKKaccUua3na8j87cT/0cxkGIu2inSwrcNm/a8mM/H9KIPnn/1o1IGHkQ4k9AstnYcFbTYXmbyGOIRj4kmctoNbTjV4R9V4MAiA0cyMwWuHUfGolUBMfIMKAMegI/hnwaELqyRt6tahgb4nQYVUH7ZR4PKxBtdKP0d4NAREO+8UDwyYKKl+chBAZ204Q5HBGSFuYoTD0p4PECLoGIoI9wcExDRzWuMc38EGHoDSnyRvUT0aPMxAbEvOPERjusxAZUNPuL8QQHb6vL6HlBk2guQ1T/EgTm8XWLaU4OsEQY7snmnwc+cUvZmN8Cax7ClN4DJaya2F6Bteatkha+Akjo3DYbap3EfwEvNE+SFr3FQJrwCmr28uGZat0S0AepBoD5IoZpom7cDYFKAQM2Lm61hl1bjDKGagNPEgkt/QN9srGmQQsvCmvPcbKB2o+kPqEsY6abBosbYBOcBHJ7u3VDndQEsLXxgs0M4zriLDZra0jOfDbTACOrxCme6QjXs9DjVjW50Tl6T5S6KCuh6ea8o1VngxIyO9pXWKa7Ok4nLfiWHBWWEEIqWE3CRbwhBWXvKBLnVQHCVrqhsalj04DFVWxfkDDTLLEzsVt0y4blcg7LVPM9an1mM2UIxy0y9dfdsiRL3Uq0XFR3Y/PNjy6GV24JXKd35cqvKaAzcchTfUBFvkKsEohjFIZBtqYS+ulzAh20Dn4xdRG4VZUM8sRbHvgTDdJz9ansDSjQUnFE+jkeD5faIxKPhAVuGKvMO6EuJvQF146oLPLAeP93qxSjJfgE0jyWe+y4xYvLH8CFL/CFxWCkij3PToI1tiT/N6kYRt5ne/rxZ/lWXuFwFcExig+N0A9SsxtE1whxThEl23kMM38UuAihRJeEkP5TZc5RMZgSg3K02LQxh6gq4SqoXs+yurAcjl8UGR8lYNklzom7CTuMhfMeyutHU1QiTMLFHQlrDjNqgKEpzfKGzHIXc8jpi2EdeewLOtDFOxBKfPWKc41+wweRd0LTKOhMQukkr66Nec98lLn4lk0Pwl9VfqAR5uY8JT0LM4YqGtxJ/ok8xubi62D/Reg1sNcGa7vnMblnC3QqRac34B2lBavOCalrVQ6/mcT3llFNOOeUf5DctfSLOH5X2CwAAAABJRU5ErkJggg==';
const cpGroupProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAAAAqVIAqFIAplEAp1EAtFgAp1EAplEA/wAAqVMAqVIAf38Avz8AmU0A/38AfwAAfz8AmjkA//8AmWYAVVUAzGYAf1IAsk4AvHoAjTgAjE8AqjoAn08AzDMA/1UAsVMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8WZGXAAAAQHRSTlMA9gpvjf1PLAHRrgIEDgICBAcBBQMFBw4ECQkKIAUDKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAg3rUdQAAA0xJREFUeNrtWdmO2zAMpKhbtnxks9m7/f+/7IycYFv0uZAKmEDgIy+DIWdIyiJnnHHGGf9RpBZjQtNt+n7YdBoL3h3Penuvdd/uiAdiD/A0uJLNEbm4EPF+FBaBIxTjictZBJHiKYgsY/An1XnjQv3t3RZt9iXKCGm+JM3eNSSLzrM+4dd0bI2PI2R5mYu3Iq+S/mB1SRL9CAhVLPDBYt4vpFNipQ+mD03PQFgGoFBNXnVJNUeIeZJsgRmoAe0Z2EPvMpwPECrOO16CNzUBruHbZcqlt5IXKeZVfkiE/aHgFFYIoOJghpp2XG+9LeZqCvrIlR5dqFwCnQjXMNfBdJbJihK0UHAAY0BWeUGui8/Z53qRin/nvk0kotiegKio8QWGrfjBAYP1hgLJri9AqiJSybAaQCJ7Lb2Zr5w8S+mskg1V9ynUriYKJEPIrEP0YaT5tkrJkjq7jEEPdnBkKgIVd5uYa6EHGligy71t0DUY3iVdlMJoDEaUZeBlCIAf6WCQFKIUW/FhvB4H4J6OdM6KujOK+5h+fAF03qcBAFqmWOHSF9EZCi65qZdsOqlDAIytIZvCId/RYt5EXo5eN3e3mcMHF6QSQz42ERQeZmtb4Ij5J/qMYFrY+ncSBZSAHud925k8bzBjg7qtd6tLj267cq373ups5KCD8dV0HwgFQ0xqyQZflZ04KtcnjPyiidPM2nniL+hyrZspMVqfAWg6Thnan91XksCV5P70lQDwI905my7aptfOWydmBH2goN/k/TEecKDuv9ZdQWG53qW6EeB9gU9ox94NsLovAFUAap5I3Futx8mRcggrQxxyLWy74X6iheVYj9YBQWeVbe0Nb5J0ZePNNn4fzjzFgNbi3iRFbssDxG55oAWHLs4VHsOhlUTKJNreKgmq78Gi4mLguRvH/lycjUpNyx5cVx0vEpy1QPb3YaVGQI8BjNZL11khOEwvkYSJWhTcxPvX9hAtmLT60jfFL2DKgccQASjAo207PYoaeNRqu6uDLqKhJRpMhgCcYA1JJ2Yb5xEknGgrEeWGlCIAjyfVgFpllGjOvEcJEciUNH7qzhId55PO+hgQrH2gGu+DU5IJczU1m9ZBP4edccYZZ5zxD+IXKTEa7pUGshgAAAAASUVORK5CYII=';
const maerskProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUfGSKd3+kiHyB11ONp6/Ft0+Ng0uSH2+na6OgiHh9jAABisbxVqvAzmZk/v/9/f/8iIB4AAP8Af38Af/9VAFV/f3+E2eb/qqoAAABbyNkkICEjHiBj1eciHh4kICAcGxwA//9dzuAiIiIjHiAjICE/v78jHiBcy90iHh4jHR0iHh4mGRljzNwiICBVqqpcy9xbydkiHiBJttk7AAAjICAiHR7///9t1OQkHCE8ADwjHiBy1uWu5usjICE6OjoiHh+Pv599AAAAQHRSTlMaJ1RnDpf4YA7NAgYEBQQChwECAgMCiQMA/f31/PC2EQH+E7PNBM3YTi1wFfMxBWmPcQcEd4wE0DcEkLAXlASobo6mvQAABTBJREFUeNrtmFd36jgQgF2ouWX77kSSJYqjYBsny6WG+v//1Y6KC8EQHmA356zngSPJsvg83Xbgk4tTA9aANWANWAPWgDcE7J2RTwLYWJzb9dL7DIAI8eVHlXz5pi/+14A9aDSfq6XV/AFl7SZiIPKJECLJDhOOGBR7csHF/SCfC3tvtqCnepO9MXFEBWADGow99ivlkTWPzD+iAfGyyZBSaQ4UkgbZGDgNcqEeRMWUhiO8PiP5QhgBpDjVd8Z4dtepAPwJmuyxJONxecZ8fIICkFBCLciqGI+IkpFZl7iei4cAJUGUqJhRMtT3asAZTuWgwsQ9+PZcJmptWv0y4N/wdARISWw1RQJitYZMuC6zddrlQy2cp7CiNOBqziVuSvUzmmuSEG6OxFPWeBoXUAn48nxE5G/YZUDznKlm0kemuDrC2cgCFl6AElGjIfxH1LgCNE8yhVEY7vSRwUDgU5F1dZCcALr+ZUALsiY5ICINYah+7Gz0DtCB6cMUosAChmUOZeJI8cVwHeB48SGgAklwZE3saGZlusgCHuL5BGUe54BlDVI6tzKygF2814PLgOMxsy4Iro0SxsangESi6yDIBDEs4A51It5ESMjc+mAWBaEGVD6IMuQ4MoB5mMTWawLyM9r8IiBrbzQia4K77Gs8/09WAchnyrcRh3oGUOAfTCD3dgVoJAcsgHCDcyDZBmqChASKMP5Ag63lwt1gPsS0otIOY82tyypMTIaJyi6K1DGAMf7fYT1fzwMFOlUmjtNIySq1gDoJqjyY6phKV0rSOckAU3mFD7INgNtkzAXwW0t/Cy7rVwFywIPnGBJegoAJvBV5zwTNSRTTYDUQKW6amMqR2L+OszQTCCdEHc4+CBI0LiK2t/Znu2w9VmrQ6IR0pwpwAF5uMGUzTwPGiRUsblmamSB/8rBX+0N9KSkAB+BIJJx8EMWsDV+L+mfLS4UGMaNoa2LakI5KL1KYuovDbskHTUZKsyjuqofbK1ArgfbB1Lgu6pAe67AizaB5vyvEXqMBWa45BvR0lvWUOROlG6or16jARxXKcm3zwMG9jknnNmpLsjM+iI4CUajm+8uAy05PtwYLcFl1HuR8pxIL52gOgeUKJnx4yCvUmvNYXRyWSl2EY/NfE8w1WIRiLq2EO+yG0lAOdVMU8ZCHowuALbb0F/CLBfQZ658CnsrDbZtAcT4PsmW7aKxw1GkvFeJHgPdvWA0g2/gnOxb+kn0SQNRep7N1t9ttx/T4aui6HRe1+DkAx1bYFvtX+ALtYuUYcJ3nKk95eLxbmdkE15P1+oCyO6yT25vYNqvLv3rQgZe8X+i/NzE1LRWmhZlqGWTWU4dYdiNCMTJR5OpegFhMvi/QGxudZXW7BZQfAYbS9tGhTrnx/YIk66ZVBcGKAht2BvBYgyH3sBHeZ4AT2N8XcOyi9+mK4l8JGGJnHWML829p8EVXEGy92lcDwsGoUvUtkisX5HcDZJuFbWGai/HVgAkNHQNIpK5vu/sB+tkbMvbX7ErAPb4gc5DWB+9r4vEmf3vKh2cAfy80qDrPWMq7BQn2fs+tLA+WXu4yE7++BxTmm0sJUL2CmiBxsEUVYnBbwK/wevTp40j6/Qb8Vmo2qGk3MV7nJUBsVbUPZm3qTRM19HpPzT47Jz78WrrpLZ7FKJNZBKsZKsqzbx/JDAcDcxElua2JlZVfqwUTd+MzfGFdnN/2jm+6nypRsXAUD3oyfdMXp2+3/0bdeDojf9Rf+WvAGrAGrAFrwBrw/wr4D2bjybgDbQ2hAAAAAElFTkSuQmCC';
const fastRetailingProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAADrABv4AAbtABvpABrtABvoABrOABPnABq4AAPuABvQAC7zACp/AAC3ACeZAAD/ACD/AFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABq+FfOAAAAQHRSTlMA/AXUVTCKCXQErwYNAgYF/wMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJl3c0gAAAtZJREFUeNrtmYtyozAMRW1JfmLS3f//2b2SIWm2nemSmoSdokkCyDacynrY1LlTTjnllEMIjZafZsCptZHmS22sCZPLfqzUHIbaz8WRdBxDGjzBAy0IuoJbFjok4C50wwD3ohvjg6AjS6e7JJniMn9LelSUHbNzKmm7lGmRsjPdgCnYmY5cyLJRcs7haXWXHggSjvK8Sd2cZhAV81OXCpsAnxCz3wB8Ad0GwNfQ/WsleRmdVRKJX0h+Hd1hsvFjW6lUurx2F0RO6qfyzGT8QJAA7yCz+kmaWVaf7piAy+qzHGb7fQf4ynz3NeAR6W6AB6WzNwtxXd8ds1ZgRS3/QyU7Mh5NfW+xQOphvm031jY7rtuQ3maK65j1au99Ctnng27LeEdjgVpQmXFseusQ9AsxixBO4KLUNf1QXNJGKGdCo/VqOEPzpF3TUMLl/SC/ueoFD6veV2JofmV9dNC24MQyZekpUwM/W/iT2BjcIgQfoQh6N/SnkXkw+pgznoMVggNJjBwEqSeHDliz51lwyPl3yBWdW2JfbeAdoKfop4CB3l8G+qE+p+lUg8Pro8TUCms5CNcLiElGH/wVFbb6AJizn1QR8si1xlJJyDErDGa3qul8bNQBYUFfbIrFNRgJLgg8zPHfgMzRJyiChDYYEMvTRL7CMGDC8hCEsOACaGTiuQK8mZslz+g6L4C0AmZ4LhQBXtwcDQUkmzvz/6QBIe8Bsxig9B2WAvaICR0w9IkHIBy3E6urjPVB5A/HXgQOqDNlFqwroDicqwW5Ehlgta65A8KydQFEmDV8ax878gWmojCcKnHUWBE7Q4sCssyRiwDbM1wLnQtrACkWp653woSOLrIOQJoaW0zKRQEndfYCBHslufxaHbRSfdHdnV5fHBUtZ3PCQFzOqif00Hp+UdMl9/RSt3U8jWd690N0V35pfShdG+i6Prjq6VaEf97/Ek855ZTjyh8Okxpz31gnUgAAAABJRU5ErkJggg==';
const knaufProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAAAApOwAnuQApOwAqPkApOwAoukApOwApe4A//8AoekAf/8Avv8Al9UAmukAAP8Af38As/4AnuYAqqoAi80ApNYAVaoAnuYAf7wAneYAkbYAf9QAjeIAzP8AAH8AP38AVf8AZpkAbbYAZswAmZkAttoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA57sK+AAAAQHRSTlMA/PxRCM5uLq8BjwIEDBABAv9wAwsNA4wGKgcGCQUCBAMFBwUFBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyxVYGgAABAZJREFUeNrtWdl23CgQLVqsQiD1areTzJbM///i1AZx5jXNOXpQPRiBZHOpqnspMMBhhx122I4skR1u+A2z9l7tfbfxhWqMOZkJrvsEmCEYsoBP+4wvTOg/YyqkvXrwYk4n477vNQffYaYUjHt1IOKK5MEZke7UNkcAL5CTJYOVfjKjeYCps1m1xKqEtupr29r+eoTKnEhl7E79xypzIpUpE1lZuFkRuqWHAGmD56SGq7C/PnyBMHUboFVXUhmUmQIwn405uzyxLFr4Bp4GZlgwTc9GbIIum/zauJu0bGcP5fUq40kGXUlBQ419bgu8ycACll6dZFgXdFuR/fgQpe2vr68HKCqTZT6XCZYhVlukN8e+qpSr4y68oC039j8i/8Ko7aipzBp0RwaZD3Xx4WheAjgzJgWospmF/R5ujgZcRJtvA1jy0HnUgYnmNZyUlSe2kK40FC8C9w91XGf/XdtRMn2Tv39XBybLsaLQBga4ajUxzzRc4Ss7zENnf+D4hrTYlAeqjGcH2lbbEARmQ4R/mTZmmsWvtjms1RhdBYZYU5mWga22IWReYvmNs9LUKACDfA/K/qqkeS//fBkBctF5dLakfRI4URkPmotAiejedUF1ldfCfvocLT5GAHxrEkFg7CLz0ZCN5pPwzQKw6IK2XmNssWvQiIoog/59ysC6pr9I/ATuFIW2wu9pMwJQ5BmI7bym4uR7RvtylqxUywgenP1v9MDqmkPenCTdjdu7ZYBdntfSagzTzY+Q6Wp6hHgfKBxJiuOJQV+FFRGewpyPTypz+qkyU0DDUu31AJ+ydiVxUfELLc4RhMyet2rstiOgksVqO+rQmlVVnrqdWPXXRwP4BldNRf4wNlluKtNI854fOa+DVIYyLcr0KoOzUoUws+dMjE6+UFlutcyjk2aMBxfdgrX508oRz6saUiwvP2WIyCEOeyRZwgxp7IkmQeyO4SpVapVJI0mx5A+42OOIi8Py8villvGDTv2YNE4c0La6rBlXlNhfpYhoPpybysCmKlOGnmhWuGumSe3kVfQqcAQp9uxaF6YQ5UNekAth5pCHwfcmW/fcFrsncf7Ncq5hLNOsHhPXefhUPrNut1pmDEl6LQONLEFScuEH3YFxAVdrFaA/k4DLCYTksKnNKBLzwc2UpEezOslBrmBu0ZOXCFZYfzjuQ42ft7Y6+N4kw9OjTQnPwNhevA3+cvGcUVPr43u6TuA+ujr7SNu3i/TZtr97E9ot7rdaPlikoJ2clmGXbwsaSUSih0X6zEhLTym199pHhHJbg7+Q6fJhl/cma0pp/d+9yT4vdq59B9rp5aLWGlg07hbgPOos8sITjdzj7NUWW6stcNhvKc7xf8jDDjtsh/YfgYEmL5LUlmUAAAAASUVORK5CYII=';
const shopeeProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAADuTSz8UjD/AADzTi3xTS3/fwD1Ti3vSivzTS3/VVX8PjvzTS3yTS33UC70VDD8VQP2UC7aRyV/AAD3UC6/Pz/2UC73UC71UC3/f3/bPR7MNDL//wCqVQDVVi3yPBOqVVW/Pwf/ZjOZMzNVAADXJyf/fz////9/AH9/fwCqAFW5RRe2SCSqVSrQRRflTBkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpHtVSAAAAQHRSTlMA+/4B0G0CsBFRAwUyjLAQAzEJApIETNJwAggFAQMGCAMFBQUDBgQBAgIDCwcGCwoAAAAAAAAAAAAAAAAAAAAABFPtNAAABWFJREFUeNrtmGmX6igQhgk7hISgWVxa7eUus8///3dTRRYT227tuX3sfLDOMUqI4aGAlyoIudvd7na3rzUGNmc8i1cp58pXwMdrD4jz5JNEC54kvHTgyxnyWWIaGi0pFzMktEQAmqiDyClVfj03wjVxCXDF3yKh2exc+DPllHuS7mRagC8TB8gzm4A0CSSNYpMSRRWxM5JmBkxZZIqFLQNa3dXMRqM5FcdR9Qk1cyFboG32C0Da60Vb+utPwN23v7967zANby0BiT7aUGryx68c5i1MveRdo3z7lYqToqJcABzNU5mmVra4diu/BpCeltXgwF53qht6tEL5m9DxhieTW3kf2zBSBCGMa5eNEe4WQ28ngJRHbXGC07EHZcdXx1gi4QIkctmAKqU3ARyP5iOpswxcQ/KBEHZl2/JlAKdyBW7mmnxTtwHckTAaTq1V9JEyPBkBVvDgI7q6xFjCiyYr1kt+G0A5AgSUTnMmczCLHDZuhW02oCHyvh2gO6IImb/WnIEDxlSiBxk69CzgUdDZtNht+W+W3rHlGDA7J4odB4sBztqyrnkE3GnooZ3kW4MCxW4MlcSi521fKTH5Ka7SUUb0kYUvvDqVQQwabBdvJyt8b0EGD5Knp95Rceh11SZexQKvh03vS6xN9bZPxuC6vzY1YxC3jFbxgpg8mSLSOgKyZQHwyujOVwjoSs5zEyGgo6sc8y2NbjO0hCJU1i0hw9e2lTF2DxmHUrgmJGbkiZ/ooF9xOvVg0fk6j/mUiV0HQBB0NKXJAyMBNRJvGPIdnM15m37lWLlGhYqVqO1rzH1iSVzhQ0Ze+GQnaQT4fjUeaDcINalRBCn4RSJgkigh4I7SknkoCocKTx3D2UC5MCaDLw0eXWG/goFnAvsB/oWRcEZhZ3aXAZcTf+Fmlzvi+GtAwh5gmiERRrbfkChuebiMSIn5Ak5DTlVMaUDLwepYGbroV8dEYsNhNaJltH3okvFXywJe6saAgyLsEDUofOCF46JOq+eojxpBtAQZckgacy4viz0O9gYvLlqNiQRc6gCF4Ibp876d0756hD2JCVglSaWgVcwQIJEhqTQQkEF/tFxi/R8cWgWi+CcpoSKAQCXdgUASK7sSxV5tLwvhOcBMquGu7qWiE7VnxHGkE+oYbZAArmnlJsqPgBCI9SIWxi00Yay1dHV5M5JEnRXn/BSQ9Vpc2HAK+AOG2AE5iK9vncT9Dv6QttkhTIKd1mmqD4fN7/A817Gk/70m3ymOMT81dRwGWHpej9S7lzKU6TVuCdD+PxNAH7eZ2Ik480FHVmRpLe6PaolPuC5ZPDzgfF11+Ya+IqK0o6TEgdo2KKh+RM3/boUYD0bMAtdiPBh5GQPqWOuefvNZXLY4igIqdYZoBc4XA+q1ME3JnrE280uyqbnyl7fkapw1ZbDsv8OL98d7lC/bzd2j2HKVKZA6nv58VEdAVAs8eOIoQSXx7TrgZR4FQT6gSlKeY5EfHh5T3E9zhYG7v+zCSVICkSCE9CYbB9T58GidJ93hHGwPpJl40EK4jbVcELaFV6oyPtsYFFFYK20x/hOQVm1onocrhvgka+rl4HXOxKClYDIIuEOcbKvSdWNfZm0YEIwJOKvSuIqdyITpjhmhUhtjat1HZToMpV/NO0eHSMdoiZ2dzP0XvlLJyV1WTF7R3b3qLHwcEJ4FFKNTLlalNu1CvsIu+0Cwa13aKqK3HmQp5NDHnrCiqo4dY7KqiitD1pgMvW3cf/jgIx2E+pOOtYjI81ydMbgt/Mdb+mzAC6/6eENxDn5qUm8lk2+Y/R/tfD7g55+Z6QO52y+ee999cLe73W2m9h+zdToANnayHAAAAABJRU5ErkJggg==';
const jtiProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAAAAsoYAt4kA//8BqHwAf38DtIYA/wAAt4cAqqoHtXoAqlUAt4kFtIcA/38Ar4MAxJMCqoYAtokBtYgAnHMA/6oAmZkAAP8AbUgfn18AzJkFwI0AxZQ/fz9VqlUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTdX1oAAAAQHRSTlMA+68BDwIpAVMDDQPSFQL8/xSUcAkDBQEHCAUttgQDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwL6DwAAAblJREFUeNrtmddywyAQRZcuEMioxOn5/88MCNW4PyRLZrgPLrJmdOYgVrAGKCkpKfnvUSm54rEznzITaAZjDDciU3/OkhQrIUNGDb2fAH0HA7au0wiVj8FLV/9yjnPu3CuCMbUm8L20/DROuPFweDFo9SNFzmO5Cx2Ww38+xJ9mDefn+YjlBAdQXDBGDrs3QrEAzVo/5nQyhC5fKzkG2eDGF32Lx6vl5ptOxAKMl3brKFsZ5mgjjs0KWGshRM3wAOPVuh++9NZgnOYK06AyYrnjqGD5AUINdI9TAAtgASyABbAA/hpgWO+0oPIFDHzV32/qHjFIW4TWx/2Atoq/5QloiCedgwajdXQDsEmb0/4j6HtC6SVcBawSYFp8I3XedoDNDpDKZU4IpjHghNgAHkgPZgEMJaWHDBpFTG0MOnheDQZ9Ar0V+C4jJk3+7DygYbcc7z7QgOwvbohpayaDXbsZUOeAYetjmvqxYxoAD2MRrrc9L409urH4TssTO+rbFWGWQzP/mFoelnqLVoSv179U7bzvDM4z7I5ZQm0QmKW+uQ4aN+A9w26niU+2poaMk/HfgyUlJSWP5Bt/1BMNwIEiFwAAAABJRU5ErkJggg==';
import CompanyLogoGrid from './CompanyLogoGrid';
import LandingInfoPage, { SocialIconLinks } from './LandingInfoPage';

// Version marker for auto-upgrade detection
// Increment this when making breaking changes that stale copies need
export const EMAIL_GATE_VERSION = 125; // v125: embeds program logos as data URLs so the space compiler does not require a PNG module loader. v124: adds normalized local logos for every company in the current 30-day program window. v123: restores logo-first ordering, guaranteed logo motion, uniform logo sizing, program-type cards, and the 30-day display window. v122: corrects the live application calendar cards, exact brand accents, date windows, and landing-section order. v121: adds full-color uniform logo and live-program marquees with database-driven application windows. v119: adds durable company marks, live program windows, VND pricing, product navigation, and full-page company information views. v118: adds early social proof with a responsive, monochrome company-logo grid. v117: verified OTP, OAuth, and phone sessions eagerly prefetch the shared Pro entitlement cache. v116: Facebook sign-in is greyed out and inert while Facebook OAuth is unavailable; LinkedIn uses the white Google-style button. v115: successful Google/Facebook/LinkedIn callbacks enter #fit-assessment directly instead of restoring the public root first. v113: Facebook now returns to /auth/callback/facebook, the route this gate consumes so callback failures remain visible. v110: email sign-in reverted to OTP-only — password fields, sign-up tabs and the reset flow are removed; Google & Facebook remain on the server-verified OAuth callback flow. v109: Google/Facebook use production OAuth authorization-code callbacks with fixed redirect URIs and server-side code exchange; Facebook is active whenever its App ID is configured. v108: social sign-in is server-verified — Google/Facebook send provider tokens to casemate-auth-v1 before a session exists. v107: multi-method sign-in — email+password, Google/Facebook OAuth, and phone/SMS OTP

type LandingProgramRow = {
  id: number;
  program_id: string;
  program_name?: string | null;
  program_type?: string | null;
  open_date?: string | null;
  active?: boolean | null;
  version?: number | null;
};

type LandingProgram = {
  row: LandingProgramRow;
  company: string;
  program: string;
  programType: string;
  openDate: Date;
};

type WorkspaceDbHook = <T>(table: string, options: Record<string, unknown>) => {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
};

type LandingCompanyBrand = {
  aliases: string[];
  color: string;
  logoUrl?: string;
  darkText?: boolean;
};

const LANDING_COMPANY_BRANDS: LandingCompanyBrand[] = [
  { aliases: ['Shopee'], color: '#EE4D2D', logoUrl: shopeeProgramLogo },
  { aliases: ['Central Retail'], color: '#E01A22' },
  { aliases: ['Techcombank'], color: '#D0021B' },
  { aliases: ['JTI', 'Japan Tobacco'], color: '#003087', logoUrl: jtiProgramLogo },
  { aliases: ['MUJI'], color: '#7F0019', logoUrl: mujiProgramLogo },
  { aliases: ['C.P. Group', 'C.P Group', 'CP Group'], color: '#E31837', logoUrl: cpGroupProgramLogo },
  { aliases: ['Maersk'], color: '#42B0D5', logoUrl: maerskProgramLogo },
  { aliases: ['Fast Retailing'], color: '#E40521', logoUrl: fastRetailingProgramLogo },
  { aliases: ['Knauf'], color: '#009FE3', logoUrl: knaufProgramLogo },
  { aliases: ["L'Oréal", 'Loreal'], color: '#A50034' },
  { aliases: ['Unilever'], color: '#1F36C7', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/4b442312-ddbc-4fbf-9e04-35354ffc752d.png' },
  { aliases: ['Nestlé', 'Nestle'], color: '#009A44' },
  { aliases: ['MoMo'], color: '#A50064' },
  { aliases: ['Viettel'], color: '#CC0000' },
  { aliases: ['AB InBev'], color: '#F5A800', darkText: true },
  { aliases: ['Home Credit'], color: '#E31837' },
  { aliases: ['Carlsberg'], color: '#006835' },
  { aliases: ['P&G', 'Procter & Gamble'], color: '#003087' },
  { aliases: ['Deloitte'], color: '#86BC25', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/776fe6a7-2180-481c-9dcc-457c1550ecc9.png' },
  { aliases: ['EY'], color: '#FFE600', darkText: true },
  { aliases: ['Suntory PepsiCo', 'PepsiCo'], color: '#0078C8', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/2f5be2a7-b927-47d1-94db-786ad4cbba03.jpg' },
  { aliases: ['TikTok'], color: '#111827', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/c175bc23-297a-4cb8-8ec8-ab00cd5d7ec5.png' },
  { aliases: ['Kimberly-Clark'], color: '#374151', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/c05b4f9f-78d5-4c39-baa2-8c402e6bd02a.png' },
  { aliases: ['Perfetti Van Melle'], color: '#374151', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/b139bdf1-6631-43ec-a751-6e4e18587001.png' },
  { aliases: ['FrieslandCampina'], color: '#374151', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/65c298ad-f8e1-442a-899e-e2cabbb01cd8.png' },
  { aliases: ['BCG', 'Boston Consulting Group'], color: '#374151', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/dfa5e306-6a31-4c21-8146-b5a8f5197931.png' },
  { aliases: ['Heineken'], color: '#374151', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/9bfa0711-a2c1-4c00-9252-f8a8f5561d41.png' },
  { aliases: ['Coca-Cola'], color: '#CC0000', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/e08f2226-ce74-4d31-9355-274894dcf788.png' },
  { aliases: ['Samsung'], color: '#374151', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/ddd7d9ad-1fe3-4590-92f9-5f6033a3cebf.png' },
  { aliases: ['Garena'], color: '#CC0000', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/8d8c8dc0-4f8e-444c-a295-f651b40b1c5d.png' },
  { aliases: ['Nielsen'], color: '#374151', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/efe5af79-04d2-4001-96c4-3657bda9c417.png' },
  { aliases: ['WPP'], color: '#374151', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/df982513-6caf-4e73-8e07-734bf76017c8.png' },
];

const DEFAULT_LANDING_BRAND: LandingCompanyBrand = { aliases: [], color: '#374151' };

function normalizeLandingCompany(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function landingCompanyBrand(company: string) {
  const normalized = normalizeLandingCompany(company);
  return LANDING_COMPANY_BRANDS.find((brand) => brand.aliases.some((alias) => normalized.includes(normalizeLandingCompany(alias)))) || DEFAULT_LANDING_BRAND;
}

function landingCompanyInitials(company: string) {
  return company.split(/\s+/).filter(Boolean).slice(0, 3).map((word) => word[0]).join('').toUpperCase() || 'P';
}

type LandingDayMonth = { day: number; month: number };

function landingDateParts(value?: string | null): LandingDayMonth[] {
  if (!value) return [];
  let values = [value];
  if (value.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) values = parsed.map(String);
    } catch {
      values = [value];
    }
  }
  return values.flatMap((item) => {
    const match = String(item).trim().match(/^(\d{1,2})\/(\d{1,2})$/);
    if (!match) return [];
    const day = Number(match[1]);
    const month = Number(match[2]);
    const date = new Date(2024, month - 1, day);
    return date.getMonth() === month - 1 && date.getDate() === day ? [{ day, month }] : [];
  });
}

function splitLandingProgramName(value: string) {
  const [company, ...parts] = value.split(' — ');
  return parts.length
    ? { company: company.trim(), program: parts.join(' — ').trim() }
    : { company: 'Casemate Partner', program: value.trim() };
}

function inferLandingProgramType(row: LandingProgramRow) {
  const explicitType = row.program_type?.trim();
  if (explicitType) return explicitType;
  const name = row.program_name?.toLowerCase() || '';
  if (name.includes('intern')) return 'Internship Program';
  if (name.includes('management trainee') || name.includes('leader') || name.includes('leadership')) return 'Leadership Program';
  return 'Graduate Program';
}

function landingWindowForToday(row: LandingProgramRow, now = new Date()): LandingProgram | null {
  if (row.active === false || !row.program_name) return null;
  const opens = landingDateParts(row.open_date);
  if (opens.length === 0) return null;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const years = [today.getFullYear() - 1, today.getFullYear(), today.getFullYear() + 1];
  for (const year of years) {
    for (const open of opens) {
      const openDate = new Date(year, open.month - 1, open.day);
      const displayUntil = new Date(year, open.month - 1, open.day + 30);
      if (today >= openDate && today <= displayUntil) {
        return {
          row,
          ...splitLandingProgramName(row.program_name),
          programType: inferLandingProgramType(row),
          openDate,
        };
      }
    }
  }
  return null;
}

function LandingProgramLogo({ company, duplicate = false }: { company: string; duplicate?: boolean }) {
  const brand = landingCompanyBrand(company);
  if (brand.logoUrl) {
    return <img src={brand.logoUrl} alt={duplicate ? '' : `${company} logo`} className="h-11 w-[116px] object-contain object-center" loading="lazy" decoding="async" />;
  }
  return (
    <span className="flex h-11 min-w-11 items-center justify-center rounded-xl px-2 text-xs font-black" style={{ backgroundColor: brand.color, color: brand.darkText ? '#111827' : '#ffffff' }} aria-label={duplicate ? undefined : `${company} initials`}>
      {landingCompanyInitials(company)}
    </span>
  );
}

function LandingProgramCard({ item, duplicate = false }: { item: LandingProgram; duplicate?: boolean }) {
  const brand = landingCompanyBrand(item.company);
  return (
    <article className="flex min-h-[220px] w-[240px] shrink-0 snap-start flex-col rounded-2xl border border-t-4 border-[#e5e7eb] bg-white p-5 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.45)]" style={{ borderTopColor: brand.color }} aria-hidden={duplicate || undefined}>
      <div className="flex h-11 items-center"><LandingProgramLogo company={item.company} duplicate={duplicate} /></div>
      <h3 className="mt-4 text-sm font-extrabold leading-5 text-[#111827]">{item.program}</h3>
      <p className="mt-1.5 text-xs font-bold text-[#6b7280]">{item.company}</p>
      <span className="mt-auto w-fit rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide" style={{ backgroundColor: `${brand.color}14`, color: brand.color }}>
        {item.programType}
      </span>
    </article>
  );
}

function LandingProgramSequence({ items, duplicate = false }: { items: LandingProgram[]; duplicate?: boolean }) {
  return (
    <div className={`flex shrink-0 gap-5 pr-5 ${duplicate ? 'casemate-program-duplicate' : ''}`} aria-hidden={duplicate || undefined}>
      {items.map((item) => <LandingProgramCard key={`${duplicate ? 'copy-' : ''}${item.row.program_id}`} item={item} duplicate={duplicate} />)}
    </div>
  );
}

function LandingLivePrograms(_props: { onStart: () => void }) {
  const useWorkspaceDB = (window as any).useWorkspaceDB as WorkspaceDbHook;
  const { data, loading, error } = useWorkspaceDB<LandingProgramRow>('program_fit_rubrics', {
    shared: true,
    filters: [{ column: 'active', operator: 'eq', value: true }],
    orderBy: { column: 'program_name', direction: 'asc' },
    limit: 500,
  });
  const newest = new Map<string, LandingProgramRow>();
  for (const row of data || []) {
    const current = newest.get(row.program_id);
    if (!current || Number(row.version || 0) > Number(current.version || 0) || (Number(row.version || 0) === Number(current.version || 0) && row.id > current.id)) newest.set(row.program_id, row);
  }
  const programs = Array.from(newest.values())
    .map((row) => landingWindowForToday(row))
    .filter((item): item is LandingProgram => item !== null)
    .sort((a, b) => b.openDate.getTime() - a.openDate.getTime() || a.program.localeCompare(b.program));

  if (!loading && (error || programs.length === 0)) return null;

  return (
    <section id="programs-open" className="border-y border-[#e5e7eb] bg-white" aria-labelledby="landing-live-programs-title">
      <style>{`
        @keyframes casemate-program-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .casemate-program-track { animation: casemate-program-marquee 42s linear infinite; }
        .casemate-program-marquee:hover .casemate-program-track { animation-play-state: paused; }
        @media (max-width: 639px) {
          .casemate-program-marquee { overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
          .casemate-program-marquee::-webkit-scrollbar { display: none; }
          .casemate-program-track { animation: none; }
          .casemate-program-duplicate { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .casemate-program-marquee { overflow-x: auto; scroll-snap-type: x mandatory; }
          .casemate-program-track { animation: none; }
          .casemate-program-duplicate { display: none; }
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#cc0000]">EXPECTING APPLICATION CALENDAR</p>
          <h2 id="landing-live-programs-title" className="mt-4 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">MT Programs Now Accepting Applications</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6b7280]">Programs currently open for applications — updated automatically from Casemate&apos;s program database.</p>
        </div>
        {loading ? (
          <div className="mt-10 flex items-center justify-center gap-2 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-8 text-sm font-semibold text-[#6b7280]"><Loader2 className="h-4 w-4 animate-spin" />Syncing application windows…</div>
        ) : (
          <div className="casemate-program-marquee -mx-4 mt-12 overflow-hidden px-4 sm:-mx-6 sm:px-6" role="region" aria-label="Programs currently open for applications">
            <div className="casemate-program-track flex w-max py-2"><LandingProgramSequence items={programs} /><LandingProgramSequence items={programs} duplicate /></div>
          </div>
        )}
      </div>
    </section>
  );
}

type ParsedResponseBody = { data: unknown; rawText: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// Parses a fetch Response body safely so a 5xx HTML page (proxy timeout,
// memory-crash restart, etc.) does not throw inside `response.json()` and
// get swallowed into the generic "Connection error" copy. Always returns
// an object instead of throwing — callers inspect `response.ok` themselves.
async function parseResponseBody(response: Response): Promise<ParsedResponseBody> {
  let rawText = '';
  try {
    rawText = await response.text();
  } catch {
    return { data: null, rawText: '' };
  }

  if (!rawText) {
    return { data: null, rawText: '' };
  }

  try {
    return { data: JSON.parse(rawText) as unknown, rawText };
  } catch {
    return { data: null, rawText };
  }
}

// Pick the most informative error message we can show to the user given
// what came back over the wire. Server-provided `error` always wins; for
// unparseable / non-JSON responses we expose the HTTP status so the bug
// is debuggable instead of being hidden behind "Connection error".
function describeResponseFailure(
  response: Response,
  body: unknown,
  rawText: string,
  fallback: string,
): string {
  if (isRecord(body)) {
    const errField = body.error;
    if (typeof errField === 'string' && errField.trim()) return errField;
    const msgField = body.message;
    if (typeof msgField === 'string' && msgField.trim()) return msgField;
  }

  const status = response.status;
  if (status === 429) return 'Too many requests. Please wait a moment and try again.';
  if (status === 502 || status === 503 || status === 504) {
    return 'The server is temporarily unavailable. Please try again in a moment.';
  }
  if (status >= 500) return `Server error (${status}). Please try again.`;
  if (status === 404) return 'This space could not be found. Please contact support.';
  if (status === 403) return 'This email is not authorized to access this space.';
  if (status === 400 && rawText) {
    // Sometimes the server returns a plain text 400; surface a trimmed copy
    const snippet = rawText.trim().slice(0, 140);
    if (snippet) return snippet;
  }

  return fallback;
}

// Snapshot of the JSON envelope returned by /api/space/:spaceId/register.
// All fields are optional because the server has historically added/removed
// keys; the client narrows individually before use.
interface SpaceRegisterResponseBody {
  success?: boolean;
  workspaceSessionId?: string;
  contactId?: string;
  email?: string;
  isReturningUser?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  visitorId?: string | null;
  workspaceId?: string;
  metadata?: Record<string, unknown>;
}

// Snapshot of the JSON envelope returned by /api/auth/otp/space/{send,verify}.
interface OtpResponseBody {
  success?: boolean;
  resendCooldown?: number;
  attemptsRemaining?: number;
  expiresIn?: number;
}

interface EmailGateProps {
  spaceId: string;
  branding?: {
    name?: string;
    tagline?: string;
    logoUrl?: string;
    heroVideoUrl?: string;
    colors?: Record<string, any>;
    palette?: Record<string, any>;
  };
  themeTokens?: DesktopThemeTokens;
}

type GateStep = 'loading' | 'email' | 'code' | 'complete';

// Views inside the login modal: the main screen (email OTP + social + phone)
// and the SMS code entry step.
type PanelView = 'main' | 'phoneCode';

// Derive a usable color set from a single hex primary color
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length !== 3 && clean.length !== 6) return null;
  const normalized =
    clean.length === 3
      ? clean.split('').map((char) => char + char).join('')
      : clean;
  return {
    r: parseInt(normalized.substring(0, 2), 16),
    g: parseInt(normalized.substring(2, 4), 16),
    b: parseInt(normalized.substring(4, 6), 16),
  };
}

function colorWithAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function normalizeHexColor(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  const match = trimmed.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  return match ? `#${match[1]}` : undefined;
}

function readableTextColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#ffffff';
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return luminance > 0.58 ? '#111827' : '#ffffff';
}

export default function EmailGate({
  spaceId,
  branding,
  themeTokens,
}: EmailGateProps) {
  const { setSessionId } = useSpaceRuntime();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<GateStep>('loading');
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [navOverLight, setNavOverLight] = useState(false);
  const [infoPage, setInfoPage] = useState<'about' | 'contact' | 'privacy' | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvDragOver, setCvDragOver] = useState(false);

  // Multi-method auth state (v114 — email OTP + Google/Facebook/LinkedIn + phone)
  const [panelView, setPanelView] = useState<PanelView>('main');
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneMasked, setPhoneMasked] = useState('');
  const [authNotice, setAuthNotice] = useState('');
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | 'linkedin' | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthServiceStatus | null>(null);
  const socialCallbackStartedRef = useRef(false);

  // Get workspaceId from window context
  const workspaceId = (window as any).__WORKSPACE_ID__ || null;
  const gdprEnabled = !!(window as any).__GDPR_ENABLED__;
  // Template previews (genesis-space*) aren’t tied to a workspace, so the
  // normal email/OTP registration can’t complete — always offer guest entry
  // there. Cloned workspaces (workspace-N) keep the flag-gated behavior.
  const isTemplatePreview = spaceId === 'genesis-space' || spaceId.startsWith('genesis-space-');
  const guestModeEnabled = !!(window as any).__GUEST_MODE_ENABLED__ || isTemplatePreview;
  const rawSocialProviders = (window as any).__SOCIAL_PROVIDERS__;
  const socialProviders: string[] = Array.isArray(rawSocialProviders) ? rawSocialProviders : [];

  useEffect(() => {
    storeAttribution();
    checkExistingSession();
  }, [spaceId]);

  // Pre-fill email from localStorage when loaded inside the onboarding walkthrough
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('walkthrough') === 'true') {
      const storedEmail = localStorage.getItem('user_email');
      if (storedEmail) setEmail(storedEmail);
    }
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Which auth methods are live: phone/SMS needs the casemate-auth-v1 hook
  // (deployed from the founder-only Usage dashboard), Google/Facebook need
  // their public IDs in lib/authAccount.ts. Checked when the login modal
  // first opens; the lib caches the answer for 10 minutes.
  useEffect(() => {
    if (!loginOpen || authStatus) return;
    let cancelled = false;
    fetchAuthServiceStatus().then((status) => {
      if (!cancelled) setAuthStatus(status);
    });
    return () => {
      cancelled = true;
    };
  }, [loginOpen, authStatus]);

  // Landing hero entrance animation (client-only; defaults visible if JS is slow)
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Adaptive floating header: the bar never paints a box of its own — only its
  // ink flips, white while it sits over the dark hero and brand red / near-black
  // once a light section is underneath it. The landing page scrolls inside
  // `.eg-root` (not the window), so the listener attaches to that container.
  // Re-runs on step change since eg-root only exists on the main landing screen.
  useEffect(() => {
    const root = document.querySelector('.eg-root') as HTMLElement | null;
    if (!root) return;
    // Flip near the bar’s vertical midpoint so the ink changes exactly as the
    // dark/light boundary passes behind it.
    const FLIP_AT = 40;
    const sync = () => {
      const hero = document.getElementById('hero');
      if (!hero) {
        setNavOverLight(root.scrollTop > FLIP_AT);
        return;
      }
      const heroBottom = hero.getBoundingClientRect().bottom - root.getBoundingClientRect().top;
      setNavOverLight(heroBottom <= FLIP_AT);
    };
    root.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
    return () => {
      root.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [step]);

  const checkExistingSession = async () => {
    // `?as=visitor` preview: never adopt a stored session — skip straight to the
    // logged-out email form instead of jumping to the empty 'complete' state.
    const forceVisitor = typeof window !== 'undefined' && (window as any).__AUDOS_FORCE_VISITOR__ === true;
    const sessionKey = `space_session_${spaceId}`;
    const existingSession = forceVisitor ? null : localStorage.getItem(sessionKey);

    if (existingSession) {
      try {
        const session = JSON.parse(existingSession);
        const effectiveSessionId = session.workspaceSessionId || session.id;

        if (effectiveSessionId) {
          // Sessions created by Google / Facebook / phone sign-in were
          // verified by their own method (provider OAuth or SMS code)
          // rather than the email-OTP flow —
          // adopt them directly instead of bouncing the returning user back
          // through the emailed-code gate.
          if (
            session.verified === true &&
            typeof session.authMethod === 'string' &&
            session.authMethod.length > 0
          ) {
            setSessionId(effectiveSessionId);
            setStep('complete');
            return;
          }
          if (workspaceId) {
            try {
              const configRes = await fetch(`/api/auth/otp/space/config/${workspaceId}`);
              const configData = await configRes.json();
              const otpConfig = configData.config || configData;

              if (otpConfig.enabled) {
                setOtpEnabled(true);
                const checkRes = await fetch(`/api/auth/otp/space/check-session?workspaceId=${workspaceId}&sessionUuid=${encodeURIComponent(effectiveSessionId)}`, {
                  credentials: 'include'
                });
                const checkData = await checkRes.json();

                if (checkData.verified) {
                  setSessionId(effectiveSessionId);
                  setStep('complete');
                  return;
                } else {
                  // v1.1: a session exists on this device but was never
                  // OTP-verified (legacy email-only sign-in, or an expired /
                  // signed-out device). Prefill the saved email so the
                  // returning user only confirms it and enters the emailed
                  // code instead of retyping their address — same email,
                  // same account, history preserved.
                  if (typeof session.email === 'string' && session.email.includes('@')) {
                    setEmail(session.email);
                  }
                  setStep('email');
                  return;
                }
              }
            } catch (e) {
              console.log('[EmailGate] OTP config check failed, using simple mode');
            }
          }

          setSessionId(effectiveSessionId);
          setStep('complete');
          return;
        }
      } catch (e) {
        console.error('Failed to parse session:', e);
      }
    }

    if (workspaceId) {
      try {
        const configRes = await fetch(`/api/auth/otp/space/config/${workspaceId}`);
        const configData = await configRes.json();
        const otpConfig = configData.config || configData;
        setOtpEnabled(otpConfig.enabled || false);
      } catch (e) {
        setOtpEnabled(false);
      }
    }

    setStep('email');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Format validation at the front door: a malformed email must never
    // reach /register (the CRM/lead capture) or trigger an OTP send. The
    // user retries inline; the OTP step remains the real deliverability
    // check for well-formed addresses.
    if (!isValidEmailFormat(email)) {
      setError(INVALID_EMAIL_MESSAGE);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const normalizedEmail = email.toLowerCase().trim();

      if (otpEnabled && workspaceId) {
        const attribution = getAttribution();
        const visitorId = getVisitorId();
        const sessionId = `csess_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

        const registerRes = await fetch(`/api/space/${spaceId}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: normalizedEmail,
            sessionId,
            visitorId,
            attribution,
            metadata: {},
            workspaceId,
            marketingConsent,
          }),
        });

        const { data: registerResult, rawText: registerRawText } =
          await parseResponseBody(registerRes);

        if (!registerRes.ok) {
          console.error('[EmailGate] register failed', {
            status: registerRes.status,
            body: registerResult ?? registerRawText.slice(0, 200),
          });
          setError(
            describeResponseFailure(
              registerRes,
              registerResult,
              registerRawText,
              'Failed to create session. Please try again.',
            ),
          );
          setLoading(false);
          return;
        }

        if (!isRecord(registerResult)) {
          console.error('[EmailGate] register returned an unparseable body', {
            status: registerRes.status,
            rawText: registerRawText.slice(0, 200),
          });
          setError('The server returned an unexpected response. Please try again.');
          setLoading(false);
          return;
        }

        const registerBody = registerResult as SpaceRegisterResponseBody;
        const wsSessionId = registerBody.workspaceSessionId;
        setPendingSessionId(wsSessionId);

        if (typeof (window as any).fbq === 'function' && (window as any).__META_PIXEL_ID__) {
          (window as any).fbq('init', (window as any).__META_PIXEL_ID__, { em: normalizedEmail.toLowerCase().trim() });
        }
        fireLeadEventWithRetry(normalizedEmail);

        const sessionKey = `space_session_${spaceId}`;
        const pendingSession = {
          id: wsSessionId,
          workspaceSessionId: wsSessionId,
          email: normalizedEmail,
          contactId: registerResult.contactId || null,
          timestamp: Date.now(),
          verified: registerResult.isReturningUser === false,
          isReturningUser: !!registerResult.isReturningUser,
          metadata: registerResult.metadata || {},
        };
        localStorage.setItem(sessionKey, JSON.stringify(pendingSession));

        if (registerResult.isReturningUser === false) {
          try {
            window.dispatchEvent(new CustomEvent('audos:session-established', {
              detail: { workspaceSessionId: wsSessionId, email: normalizedEmail },
            }));
          } catch (e) {}

          if (wsSessionId) void prefetchCasemateEntitlement(wsSessionId);
          setSessionId(wsSessionId);
          completeGateEntry();
          setLoading(false);
          return;
        }

        const response = await fetch('/api/auth/otp/space/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email: normalizedEmail, workspaceId, sessionUuid: wsSessionId }),
        });

        const { data: otpResult, rawText: otpRawText } = await parseResponseBody(response);

        if (!response.ok) {
          console.error('[EmailGate] otp send failed', {
            status: response.status,
            body: otpResult ?? otpRawText.slice(0, 200),
          });
          setError(
            describeResponseFailure(
              response,
              otpResult,
              otpRawText,
              'Failed to send code. Please try again.',
            ),
          );
          setLoading(false);
          return;
        }

        const otpBody: OtpResponseBody = isRecord(otpResult) ? otpResult : {};
        setResendCooldown(otpBody.resendCooldown ?? 60);
        setStep('code');
      } else {
        await registerSession();
      }
    } catch (err) {
      console.error('[EmailGate] Network error in handleEmailSubmit:', err);
      setError('Connection error. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 4) {
      setError('Please enter the 4-digit code');
      return;
    }

    setError('');
    setLoading(true);

    try {
      if (!pendingSessionId) {
        setError('Session expired. Please start over.');
        setStep('email');
        setLoading(false);
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();
      const response = await fetch('/api/auth/otp/space/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: normalizedEmail, code, workspaceId, sessionUuid: pendingSessionId }),
      });

      const { data: verifyResult, rawText: verifyRawText } = await parseResponseBody(response);
      const verifyBody: OtpResponseBody = isRecord(verifyResult) ? verifyResult : {};

      if (!response.ok || !verifyBody.success) {
        console.error('[EmailGate] otp verify failed', {
          status: response.status,
          body: verifyResult ?? verifyRawText.slice(0, 200),
        });
        if (typeof verifyBody.attemptsRemaining === 'number') {
          setError(`Invalid code. ${verifyBody.attemptsRemaining} attempts remaining.`);
        } else {
          setError(
            describeResponseFailure(
              response,
              verifyResult,
              verifyRawText,
              'Invalid code. Please try again.',
            ),
          );
        }
        setLoading(false);
        return;
      }

      await completeVerifiedSession();
    } catch (err) {
      console.error('[EmailGate] Network error in handleCodeSubmit:', err);
      setError('Connection error. Please check your internet connection and try again.');
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || !pendingSessionId) return;

    setLoading(true);
    setError('');

    try {
      const normalizedEmail = email.toLowerCase().trim();
      const response = await fetch('/api/auth/otp/space/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: normalizedEmail, workspaceId, sessionUuid: pendingSessionId }),
      });

      const { data: resendResult, rawText: resendRawText } = await parseResponseBody(response);

      if (response.ok) {
        const resendBody: OtpResponseBody = isRecord(resendResult) ? resendResult : {};
        setResendCooldown(resendBody.resendCooldown ?? 60);
        setCode('');
      } else {
        console.error('[EmailGate] otp resend failed', {
          status: response.status,
          body: resendResult ?? resendRawText.slice(0, 200),
        });
        setError(
          describeResponseFailure(
            response,
            resendResult,
            resendRawText,
            'Failed to resend code. Please try again.',
          ),
        );
      }
    } catch (err) {
      console.error('[EmailGate] Network error in handleResendCode:', err);
      setError('Connection error. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const completeVerifiedSession = async () => {
    const sessionKey = `space_session_${spaceId}`;
    const normalizedEmail = email.toLowerCase().trim();
    let verifiedMetadata: Record<string, unknown> = {};
    try {
      const existingSession = localStorage.getItem(sessionKey);
      if (existingSession) {
        const parsed = JSON.parse(existingSession);
        if (parsed.metadata) verifiedMetadata = parsed.metadata;
      }
    } catch {}
    const session = {
      id: pendingSessionId,
      workspaceSessionId: pendingSessionId,
      email: normalizedEmail,
      timestamp: Date.now(),
      verified: true,
      isReturningUser: true,
      metadata: verifiedMetadata,
    };
    localStorage.setItem(sessionKey, JSON.stringify(session));
    void prefetchCasemateEntitlement(pendingSessionId!);

    try {
      window.dispatchEvent(new CustomEvent('audos:session-established', {
        detail: {
          workspaceSessionId: pendingSessionId,
          email: normalizedEmail,
        }
      }));
    } catch (e) {}

    setSessionId(pendingSessionId!);
    completeGateEntry();
    setLoading(false);
  };

  const registerSession = async () => {
    const normalizedEmail = email.toLowerCase().trim();

    // Template previews have no workspace, so the server-side register can
    // never succeed ("Could not resolve workspace from space."). Create a
    // local preview session with the entered email instead.
    if (isTemplatePreview) {
      const previewId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      const previewSession = {
        id: previewId,
        workspaceSessionId: previewId,
        email: normalizedEmail,
        isGuest: true,
        timestamp: Date.now(),
        verified: true,
        metadata: {},
      };
      localStorage.setItem(`space_session_${spaceId}`, JSON.stringify(previewSession));
      try {
        window.dispatchEvent(new CustomEvent('audos:session-established', {
          detail: { workspaceSessionId: previewId, email: normalizedEmail, isGuest: true },
        }));
      } catch (e) {}
      setSessionId(previewId);
      completeGateEntry();
      setLoading(false);
      return;
    }

    const attribution = getAttribution();
    const visitorId = getVisitorId();
    const sessionId = `csess_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    const response = await fetch(`/api/space/${spaceId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: normalizedEmail,
        sessionId,
        visitorId,
        attribution,
        metadata: {},
        workspaceId,
        marketingConsent,
      }),
    });

    const { data: registerResult, rawText: registerRawText } = await parseResponseBody(response);

    if (!response.ok) {
      console.error('[EmailGate] registerSession failed', {
        status: response.status,
        body: registerResult ?? registerRawText.slice(0, 200),
      });
      setError(
        describeResponseFailure(
          response,
          registerResult,
          registerRawText,
          'Registration failed. Please try again.',
        ),
      );
      setLoading(false);
      return;
    }

    if (!isRecord(registerResult)) {
      console.error('[EmailGate] registerSession returned an unparseable body', {
        status: response.status,
        rawText: registerRawText.slice(0, 200),
      });
      setError('The server returned an unexpected response. Please try again.');
      setLoading(false);
      return;
    }

    const registerBody = registerResult as SpaceRegisterResponseBody;
    const effectiveSessionId =
      registerBody.workspaceSessionId ||
      `anon_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    const sessionKey = `space_session_${spaceId}`;
    const session = {
      id: effectiveSessionId,
      workspaceSessionId: registerBody.workspaceSessionId || effectiveSessionId,
      email: normalizedEmail,
      contactId: registerBody.contactId || null,
      timestamp: Date.now(),
      isReturningUser: !!registerBody.isReturningUser,
      metadata: registerBody.metadata || {},
    };
    localStorage.setItem(sessionKey, JSON.stringify(session));

    try {
      window.dispatchEvent(new CustomEvent('audos:session-established', {
        detail: {
          workspaceSessionId: registerBody.workspaceSessionId,
          email: normalizedEmail,
        }
      }));
    } catch (e) {}

    if (typeof (window as any).fbq === 'function' && (window as any).__META_PIXEL_ID__) {
      (window as any).fbq('init', (window as any).__META_PIXEL_ID__, { em: normalizedEmail.toLowerCase().trim() });
    }
    fireLeadEventWithRetry(normalizedEmail);

    setSessionId(effectiveSessionId);
    completeGateEntry();
    setLoading(false);
  };

  const handleGuestMode = async () => {
    setError('');
    setLoading(true);

    try {
      const guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      const sessionKey = `space_session_${spaceId}`;
      const guestSession = {
        id: guestId,
        workspaceSessionId: guestId,
        email: null,
        isGuest: true,
        timestamp: Date.now(),
        verified: true,
        metadata: {},
      };
      localStorage.setItem(sessionKey, JSON.stringify(guestSession));

      try {
        window.dispatchEvent(new CustomEvent('audos:session-established', {
          detail: { workspaceSessionId: guestId, isGuest: true },
        }));
      } catch (e) {}

      setSessionId(guestId);
      completeGateEntry();
    } catch (err) {
      setError('Could not continue as guest. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // `?as=visitor` preview forces the signed-out view even after a real
  // sign-in: the gate would render nothing and the visitor would land on the
  // blank-screen lock instead of the space. The session write is real (only
  // reads are shadowed under the forced-visitor preview), so drop the
  // as=visitor param and reload — the fresh session is adopted and the
  // signed-in space opens.
  const completeGateEntry = () => {
    try {
      if (typeof window !== 'undefined' && (window as any).__AUDOS_FORCE_VISITOR__ === true) {
        const url = new URL(window.location.href);
        url.searchParams.delete('as');
        window.location.replace(url.toString());
        return;
      }
    } catch (e) {}
    setStep('complete');
  };

  const handleSocialLogin = (provider: string) => {
    // Every platform-managed provider returns to the authenticated app deep
    // link. The EmailGate remains the fallback only when authentication fails.
    let socialReturnTo = new URL(SOCIAL_OAUTH_SUCCESS_PATH, window.location.origin).toString();
    try {
      const url = new URL(SOCIAL_OAUTH_SUCCESS_PATH, window.location.origin);
      url.searchParams.delete('as');
      socialReturnTo = url.toString();
    } catch (e) {}
    const returnUrl = encodeURIComponent(socialReturnTo);
    const url = workspaceId
      ? `/api/auth/social/${provider}?workspaceId=${workspaceId}&spaceId=${spaceId}&returnUrl=${returnUrl}`
      : `/api/auth/social/${provider}?spaceId=${spaceId}&returnUrl=${returnUrl}`;
    window.location.href = url;
  };

  // ---- Multi-method auth (v107) -------------------------------------------

  /** Store the session for ANY successful method exactly like the classic
   *  email flow does, fire the same lead events, and enter the space. */
  const adoptAuthSession = (
    wsSessionId: string,
    emailValue: string | null,
    method: 'google' | 'facebook' | 'linkedin' | 'phone',
    extra: {
      phone?: string | null;
      phoneMasked?: string | null;
      displayName?: string | null;
      avatarUrl?: string | null;
      isReturningUser?: boolean;
    } = {},
  ) => {
    const sessionKey = `space_session_${spaceId}`;
    const session = {
      id: wsSessionId,
      workspaceSessionId: wsSessionId,
      email: emailValue,
      phone: extra.phone || null,
      phoneMasked: extra.phoneMasked || null,
      displayName: extra.displayName || null,
      avatarUrl: extra.avatarUrl || null,
      timestamp: Date.now(),
      verified: true,
      authMethod: method,
      isReturningUser: !!extra.isReturningUser,
      metadata: {
        displayName: extra.displayName || null,
        avatarUrl: extra.avatarUrl || null,
      },
    };
    localStorage.setItem(sessionKey, JSON.stringify(session));
    void prefetchCasemateEntitlement(wsSessionId);
    try {
      window.dispatchEvent(new CustomEvent('audos:session-established', {
        detail: { workspaceSessionId: wsSessionId, email: emailValue, authMethod: method },
      }));
    } catch (e) {}
    if (emailValue) {
      if (typeof (window as any).fbq === 'function' && (window as any).__META_PIXEL_ID__) {
        (window as any).fbq('init', (window as any).__META_PIXEL_ID__, { em: emailValue });
      }
      fireLeadEventWithRetry(emailValue);
    }
    setSessionId(wsSessionId);
    completeGateEntry();
  };

  // Finish the fixed Google, Facebook, and LinkedIn production callbacks exactly once.
  // The browser never receives a provider secret: it sends the short-lived code
  // to casemate-auth-v1, which exchanges and verifies it server-side, then
  // returns the same canonical workspace session every other login method uses.
  useEffect(() => {
    const match = /^\/auth\/callback\/(google|facebook|linkedin)\/?$/.exec(window.location.pathname);
    if (!match || socialCallbackStartedRef.current) return;
    socialCallbackStartedRef.current = true;
    const provider = match[1] as 'google' | 'facebook' | 'linkedin';
    setPanelView('main');
    setLoginOpen(true);
    setError('');
    setSocialLoading(provider);

    void completeSocialOAuthCallback(provider)
      .then(({ result, returnTo }) => {
        let safeReturnTo = '/';
        try {
          const parsed = new URL(returnTo, window.location.origin);
          if (parsed.origin === window.location.origin) {
            safeReturnTo = parsed.pathname + parsed.search + parsed.hash;
          }
        } catch (e) {}
        const oauthSucceeded = result.success && !!result.workspaceSessionId;
        window.history.replaceState(
          {},
          '',
          oauthSucceeded ? SOCIAL_OAUTH_SUCCESS_PATH : safeReturnTo,
        );
        if (oauthSucceeded && result.workspaceSessionId) {
          adoptAuthSession(result.workspaceSessionId, result.email || null, provider, {
            displayName: result.displayName || null,
            avatarUrl: result.avatarUrl || null,
            isReturningUser: !!result.isReturningUser,
          });
          return;
        }
        setError(
          result.error ||
            (provider === 'google'
              ? 'Google sign-in failed. Please start again.'
              : provider === 'facebook'
                ? 'Facebook sign-in failed. Please start again.'
                : 'LinkedIn sign-in failed. Please start again.'),
        );
      })
      .catch(() => {
        window.history.replaceState({}, '', '/');
        setError('Sign-in could not be completed. Please start again or use email.');
      })
      .finally(() => setSocialLoading(null));
    // The callback is intentionally consumed once for this page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Start the provider’s production authorization-code flow. The redirect URI
   *  is fixed in lib/authAccount.ts and cannot fall back to localhost or the
   *  current preview origin. */
  const runSocialSignIn = async (provider: 'google' | 'facebook' | 'linkedin') => {
    if (socialLoading || loading) return;
    const configured = provider === 'google'
      ? isGoogleLoginConfigured()
      : provider === 'facebook'
        ? isFacebookLoginConfigured()
        : isLinkedInLoginConfigured();
    if (!configured) {
      const label = provider === 'google' ? 'Google' : provider === 'facebook' ? 'Facebook' : 'LinkedIn';
      setError(`${label} sign-in is not activated yet. Please use email for now.`);
      return;
    }
    setError('');
    setAuthNotice('');
    setSocialLoading(provider);
    try {
      const appReturnTo = new URL(SOCIAL_OAUTH_SUCCESS_PATH, window.location.origin);
      appReturnTo.searchParams.delete('as');
      await beginSocialOAuth(provider, appReturnTo.toString());
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : `${provider === 'google' ? 'Google' : provider === 'facebook' ? 'Facebook' : 'LinkedIn'} sign-in could not start. Please try again.`,
      );
      setSocialLoading(null);
    }
  };

  const handleGoogleLogin = () => {
    void runSocialSignIn('google');
  };

  const handleLinkedInLogin = () => {
    void runSocialSignIn('linkedin');
  };

  // Password sign-in/sign-up and the emailed password-reset flow were removed
  // in v110 — email authentication is the original OTP-only flow again
  // (handleEmailSubmit → /register → emailed 4-digit code → handleCodeSubmit).

  const handlePhoneSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const fullPhone = composeE164(phoneCountry, phoneNumber);
    if (!fullPhone) {
      setError('Please enter a valid phone number.');
      return;
    }
    setError('');
    setAuthNotice('');
    setLoading(true);
    try {
      const result = await smsSendOtp(fullPhone);
      if (result.success) {
        setPhoneMasked(result.phoneMasked || fullPhone);
        setPhoneCode('');
        setAuthNotice(`We texted a code to ${result.phoneMasked || fullPhone}.`);
        setPanelView('phoneCode');
      } else if (result.code === 'sms_not_configured' || result.code === 'service_unavailable') {
        setError('Phone sign-in is coming soon — please use another method for now.');
      } else {
        setError(result.error || 'Could not send the code. Please double-check the number and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const fullPhone = composeE164(phoneCountry, phoneNumber);
    if (!fullPhone) {
      setError('Please re-enter your phone number.');
      setPanelView('main');
      return;
    }
    const cleanCode = phoneCode.replace(/\D/g, '');
    if (cleanCode.length < 4) {
      setError('Please enter the code we texted you.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await smsVerifyOtp(fullPhone, cleanCode, { visitorId: getVisitorId() });
      if (result.success && result.workspaceSessionId) {
        adoptAuthSession(result.workspaceSessionId, result.email || null, 'phone', {
          phone: result.phone || fullPhone,
          phoneMasked: result.phoneMasked || phoneMasked,
          isReturningUser: !!result.isReturningUser,
        });
        return;
      }
      setError(result.error || 'That code did not work. Please try again or request a new one.');
    } finally {
      setLoading(false);
    }
  };

  function getVisitorId(): string {
    const key = 'audos_visitor_id';
    let id = localStorage.getItem(key);
    if (!id) {
      id = `v_${Math.random().toString(36).substring(2)}_${Date.now()}`;
      localStorage.setItem(key, id);
    }
    return id;
  }

  function getAttrCookie(): Record<string, string> | null {
    try {
      const raw = localStorage.getItem('audos_attribution');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function setAttrCookie(jsonStr: string) {
    const ATTR_COOKIE_NAME = 'audos_attr';
    const MULTI_LEVEL_TLDS = ['co.uk','co.za','co.in','co.jp','co.kr','co.nz','com.au','com.br','com.cn','com.mx','com.sg','com.hk','com.tw','com.ar','com.co','com.eg','com.my','com.ng','com.pe','com.ph','com.pk','com.tr','com.ua','com.vn','org.uk','org.au','net.au','net.uk','ac.uk','gov.uk','gov.au','edu.au','ne.jp','or.jp'];
    const hostname = window.location.hostname;
    const platformDomains = [
      'replit.dev', 'replit.app', 'repl.co',
      'github.io', 'herokuapp.com', 'netlify.app', 'vercel.app',
      'pages.dev', 'workers.dev', 'web.app', 'firebaseapp.com',
      'azurewebsites.net', 'cloudfront.net', 'amazonaws.com',
      'ngrok.io', 'ngrok.app', 'railway.app', 'render.com',
      'fly.dev', 'deno.dev', 'glitch.me'
    ];
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.localhost');
    const isIP = /^\d+\.\d+\.\d+\.\d+$/.test(hostname);
    let isPlatform = false;
    for (let i = 0; i < platformDomains.length; i++) {
      if (hostname.endsWith('.' + platformDomains[i]) || hostname === platformDomains[i]) {
        isPlatform = true;
        break;
      }
    }
    let domainPart = '';
    if (!isLocalhost && !isIP && !isPlatform) {
      const parts = hostname.split('.');
      const lastTwo = parts.slice(-2).join('.');
      if (MULTI_LEVEL_TLDS.indexOf(lastTwo) !== -1 && parts.length >= 3) {
        domainPart = '; domain=.' + parts.slice(-3).join('.');
      } else if (parts.length >= 2) {
        domainPart = '; domain=.' + parts.slice(-2).join('.');
      }
    }
    const isSecure = window.location.protocol === 'https:';
    const secureFlag = isSecure ? '; Secure' : '';
    document.cookie = ATTR_COOKIE_NAME + '=' + encodeURIComponent(jsonStr) + '; max-age=86400; path=/' + domainPart + '; SameSite=Lax' + secureFlag;
  }

  function storeAttribution() {
    const params = new URLSearchParams(window.location.search);
    const hasUtm = params.has('utm_source') || params.has('utm_medium') || params.has('utm_campaign') || params.has('fbclid') || params.has('gclid') || params.has('ref');
    if (!hasUtm) return;

    const attr: Record<string, string> = { capturedAt: Date.now().toString() };
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'ref'].forEach(p => {
      const v = params.get(p);
      if (v) attr[p === 'ref' ? 'referrer' : p.replace('utm_', 'utm').replace('_', '')] = v;
    });
    if (document.referrer) attr.httpReferrer = document.referrer;

    try {
      localStorage.setItem('audos_attribution', JSON.stringify(attr));
    } catch {}

    const cookieAttr: Record<string, string> = { capturedAt: new Date().toISOString() };
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'ref'].forEach(p => {
      const v = params.get(p);
      if (v) cookieAttr[p] = v;
    });
    if (document.referrer) cookieAttr.httpReferrer = document.referrer;
    try {
      setAttrCookie(JSON.stringify(cookieAttr));
      console.log('[EmailGate] Attribution stored in cookie:', cookieAttr);
    } catch {}
  }

  async function fireLeadEventWithRetry(emailAddr: string, attempt = 0) {
    const normalizedEmail = emailAddr.toLowerCase().trim();
    // Task #1480: stable conversion id used for both client-side rdt('track','Lead', …)
    // and server-side Reddit CAPI so they dedupe.
    const conversionId = `lead_${spaceId}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const tryFireFbq = (): boolean => {
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Email Capture',
          content_category: 'space',
        }, {
          em: normalizedEmail
        });
        console.log('[EmailGate] Meta Pixel Lead event fired for:', emailAddr);
        return true;
      }
      return false;
    };

    if (!tryFireFbq()) {
      console.log('[EmailGate] fbq not ready, will retry with exponential backoff...');
      const maxRetries = 5;
      const delays = [100, 200, 400, 800, 1600];

      const retryWithBackoff = (retryAttempt: number) => {
        if (retryAttempt >= maxRetries) {
          console.warn('[EmailGate] Failed to fire Lead event - fbq never loaded after 5 retries');
          return;
        }
        setTimeout(() => {
          if (tryFireFbq()) {
            console.log(`[EmailGate] Lead event fired after ${retryAttempt + 1} retries`);
          } else {
            retryWithBackoff(retryAttempt + 1);
          }
        }, delays[retryAttempt]);
      };

      retryWithBackoff(0);
    }

    // Task #1480: Reddit Pixel Lead (parallel to Meta). We call window.rdt
    // directly — the queue stub installed by the injected PageVisit snippet
    // (Task #1456, already live) handles late pixel.js loads, so we don’t
    // need the exponential-backoff retry the Meta path uses. Re-running
    // rdt('init', …, { email, externalId }) propagates advanced matching for
    // the subsequent Lead event (Reddit "Step 3: Set up match keys").
    try {
      const rdt = (window as any).rdt;
      const pixelId = (window as any).__REDDIT_PIXEL_ID__;
      if (typeof rdt === 'function') {
        if (pixelId) {
          rdt('init', pixelId, { email: normalizedEmail, externalId: getVisitorId() });
        }
        rdt('track', 'Lead', { conversionId });
        console.log('[EmailGate] Reddit Pixel Lead event fired (conversionId=' + conversionId + ')');
      }
    } catch (e) {
      console.warn('[EmailGate] Reddit Pixel Lead failed:', e);
    }

    if (!workspaceId) return;
    try {
      await fetch(`/api/space/${spaceId}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'lead',
          sessionId: `lead_${Date.now()}`,
          visitorId: getVisitorId(),
          // Task #1480: include conversionId so server-side Reddit CAPI dedupes
          // with the client-side rdt('track','Lead',…) fired above.
          conversionId,
          metadata: { email: emailAddr, conversionId, ...getAttribution() },
          workspaceId,
        }),
      });
    } catch {
      if (attempt < 2) setTimeout(() => fireLeadEventWithRetry(emailAddr, attempt + 1), 2000);
    }
  }

  const getAttribution = () => {
    const params = new URLSearchParams(window.location.search);

    const urlAttribution: Record<string, string | null> = {};
    if (params.get('utm_source')) urlAttribution.utmSource = params.get('utm_source');
    if (params.get('utm_medium')) urlAttribution.utmMedium = params.get('utm_medium');
    if (params.get('utm_campaign')) urlAttribution.utmCampaign = params.get('utm_campaign');
    if (params.get('utm_content')) urlAttribution.utmContent = params.get('utm_content');
    if (params.get('utm_term')) urlAttribution.utmTerm = params.get('utm_term');
    if (params.get('fbclid')) urlAttribution.fbclid = params.get('fbclid');
    if (params.get('gclid')) urlAttribution.gclid = params.get('gclid');
    if (params.get('ref')) urlAttribution.referrer = params.get('ref');
    if (document.referrer) urlAttribution.httpReferrer = document.referrer;

    const storedAttr = getAttrCookie();

    const merged: Record<string, string | null> = {};
    if (storedAttr) {
      for (const [key, value] of Object.entries(storedAttr)) {
        if (value && key !== 'capturedAt') merged[key] = value;
      }
    }
    for (const [key, value] of Object.entries(urlAttribution)) {
      if (value) merged[key] = value;
    }

    return Object.keys(merged).length > 0 ? merged : null;
  };

  const runtimeConfig = (window as any).__SPACE_CONFIG__;
  const runtimeDesktop = runtimeConfig?.desktop || {};
  const runtimeThemeTokens = runtimeDesktop?.themeTokens || {};
  const runtimeBranding = runtimeDesktop?.branding || {};
  // Founder-selected typography flows through themeTokens.typography (kickoff →
  // compiled __SPACE_CONFIG__). Derive the body/heading font stacks here so the
  // landing renders the chosen fonts instead of a hard-coded system-ui.
  const typography =
    themeTokens?.typography || runtimeThemeTokens?.typography || {};
  const bodyFontStack = typography.bodyFont
    ? `"${typography.bodyFont}", system-ui, -apple-system, sans-serif`
    : 'system-ui, -apple-system, sans-serif';
  const headingFontStack = typography.headingFont
    ? `"${typography.headingFont}", system-ui, -apple-system, sans-serif`
    : bodyFontStack;
  // Kickoff stores the manually selected color in palette.primary. Shell accent
  // is derived from palette.highlight and is only a fallback for older spaces.
  const selectedAccentColor = normalizeHexColor(
    themeTokens?.shell?.accentColor ||
      runtimeThemeTokens?.shell?.accentColor ||
      runtimeDesktop?.theme?.accentColor,
  );
  const palette =
    themeTokens?.palette ||
    runtimeThemeTokens?.palette ||
    branding?.palette ||
    runtimeBranding?.palette ||
    branding?.colors ||
    runtimeBranding?.colors ||
    {};
  const palettePrimary = normalizeHexColor(palette?.primary);
  const primaryColor = palettePrimary || selectedAccentColor || '#1e293b';
  const highlightColor = normalizeHexColor(palette?.highlight || palette?.secondary) || primaryColor;
  const contrastColor = palette?.contrast || '#ffffff';
  const brandName = branding?.name || 'Welcome';
  const tagline = branding?.tagline || 'Get started today.';
  const bgLight = palette?.surfaces?.page || colorWithAlpha(primaryColor, 0.04);
  const bgMedium = palette?.surfaces?.accentSoft || colorWithAlpha(primaryColor, 0.08);
  const borderColor = palette?.surfaces?.border || colorWithAlpha(primaryColor, 0.15);
  const panelColor = themeTokens?.shell?.panelBackground || palette?.surfaces?.panel || '#ffffff';
  const panelStrongColor =
    themeTokens?.shell?.panelStrongBackground || palette?.surfaces?.panelStrong || '#ffffff';
  const pageBackground = themeTokens?.shell?.pageBackground || palette?.surfaces?.page || '#ffffff';
  const sectionBackground = palette?.surfaces?.muted || '#f9fafb';
  const gateGradient =
    themeTokens?.shell?.gateBackground ||
    `linear-gradient(180deg, ${
      palette?.surfaces?.gradientFrom || bgLight
    } 0%, ${
      palette?.surfaces?.gradientVia || '#ffffff'
    } 55%, ${
      palette?.surfaces?.gradientTo || '#ffffff'
    } 100%)`;
  const textPrimary = palette?.text?.brand || primaryColor;
  const textMuted = palette?.text?.secondary || colorWithAlpha(primaryColor, 0.55);
  const textSubtle = palette?.text?.muted || colorWithAlpha(primaryColor, 0.35);
  const dangerColor = palette?.semantic?.danger || 'var(--space-semantic-danger)';
  const successColor = palette?.semantic?.success || 'var(--space-semantic-success)';
  const warningColor = palette?.semantic?.warning || 'var(--space-semantic-warning)';
  const selectedAccentOverridesPalette = !palettePrimary && !!selectedAccentColor;
  const onPrimary = selectedAccentOverridesPalette
    ? readableTextColor(primaryColor)
    : palette?.text?.onPrimary || readableTextColor(primaryColor);
  const onHighlight = selectedAccentOverridesPalette
    ? readableTextColor(highlightColor)
    : palette?.text?.onHighlight || onPrimary;
  // Vibrant hero gradient built from the workspace palette (never hardcoded
  // brand hex) so every generated space gets its own energetic look.
  const heroGradient = `linear-gradient(135deg, ${primaryColor} 0%, ${highlightColor} 55%, ${contrastColor} 115%)`;
  const brandGradient = `linear-gradient(135deg, ${primaryColor} 0%, ${highlightColor} 100%)`;
  // Hero copy + CTAs sit on the gradient/video, so they stay white over a
  // dark scrim. The scrim deepens for light primaries so text stays legible
  // regardless of the workspace palette (contrast may resolve to white).
  const primaryRgb = hexToRgb(primaryColor);
  const primaryIsLight = primaryRgb
    ? (0.2126 * primaryRgb.r + 0.7152 * primaryRgb.g + 0.0722 * primaryRgb.b) / 255 > 0.62
    : false;
  // Slightly deeper than before: the founder’s hero image has bright light
  // streaks on the left, exactly where the headline sits.
  const heroScrim = `linear-gradient(105deg, rgba(0,0,0,${primaryIsLight ? 0.55 : 0.45}) 0%, rgba(0,0,0,${primaryIsLight ? 0.52 : 0.38}) 48%, rgba(0,0,0,0.06) 88%)`;
  const heroVideoUrl =
    branding?.heroVideoUrl ||
    runtimeBranding.heroVideoUrl ||
    (window as any).__WORKSPACE_HERO_VIDEO_URL__ ||
    '';
  const heroHasVideo = typeof heroVideoUrl === 'string' && heroVideoUrl.trim().length > 0;
  // Static hero image — sharp abstract red light streaks on near-black,
  // rendered eagerly above the fold with no autoplay video.
  const heroImageUrl =
    'https://storage.googleapis.com/audos-images/generated-images/agent/workspace-539150/img-1789529370697-nsmyb9.png';
  // Near-black ink for section headings (consultancy-grade hierarchy): the
  // brand red stays an accent (rules, icons, CTAs) instead of coloring whole
  // headlines.
  const headingInk = normalizeHexColor(palette?.text?.primary) || '#111827';
  const loginPanelId = 'email-gate-login-panel';

  const openLogin = () => {
    setPanelView('main');
    setError('');
    setAuthNotice('');
    setLoginOpen(true);
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('[data-testid="input-email"]');
      input?.focus();
    }, 0);
  };

  // Bain-style top navigation: in-page section links. The landing scrolls
  // inside `.eg-root` (not the window), so scrollIntoView targets the section
  // directly instead of relying on URL-fragment navigation.
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Adaptive navbar ink. The mark is drawn as a vector outline rather than as an
  // image, so it is exactly white over the dark hero and exactly near-black once a
  // light section has scrolled under the bar — and in both states the only thing
  // painted is the outline itself. All nav text uses the same high-contrast ink.
  const lightNavInk = '#111827';
  const navInk = navOverLight ? lightNavInk : '#ffffff';
  const navLinkInk = navOverLight ? lightNavInk : '#ffffff';

  // Centralized brand mark: the outline on its own, in one flat colour, with no
  // chip, plate or rounded square behind it — so it reads as the mark wherever
  // it is dropped instead of as a coloured tile. `blockColor` picks the ink:
  // brand red on light surfaces, white on dark ones.
  const BrandMark = ({
    size = 40,
    blockColor,
  }: { size?: number; blockColor?: string }) => (
    <BrandLogoMark size={size} color={blockColor || primaryColor} title={brandName} />
  );

  // Decorative side rails that fill the wide page margins on desktop (xl+):
  // a hairline with a few on-brand outline icons, tinted with the brand red
  // at low opacity. Pure inline SVG (lucide) — zero network weight — and
  // aria-hidden + pointer-events-none so they never affect interaction,
  // accessibility, or load performance.
  const EdgeRail = ({ icons, side }: { icons: any[]; side: 'left' | 'right' }) => (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 hidden flex-col items-center justify-center gap-10 xl:flex"
      style={side === 'left' ? { left: 36, width: 48 } : { right: 36, width: 48 }}
    >
      <span style={{ width: 1, flexGrow: 1, maxHeight: 96, backgroundColor: colorWithAlpha(primaryColor, 0.18) }} />
      {icons.map((Icon, i) => (
        <span
          key={i}
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{
            border: `1px solid ${colorWithAlpha(primaryColor, 0.18)}`,
            backgroundColor: colorWithAlpha(primaryColor, 0.05),
            color: colorWithAlpha(primaryColor, 0.5),
          }}
        >
          <Icon size={19} strokeWidth={1.6} />
        </span>
      ))}
      <span style={{ width: 1, flexGrow: 1, maxHeight: 96, backgroundColor: colorWithAlpha(primaryColor, 0.18) }} />
    </div>
  );

  // Legacy single-method panel (pre-v107), kept unreferenced for easy
  // rollback — the live modal renders renderLoginPanel(true) defined below.
  const LegacyLoginPanelV106 = ({ compact = false }: { compact?: boolean }) => (
    <div
      id={loginPanelId}
      className={compact ? '' : 'rounded-3xl p-6 sm:p-8'}
      style={compact ? undefined : {
        backgroundColor: panelColor,
        boxShadow: `0 24px 48px ${colorWithAlpha(primaryColor, 0.14)}, 0 2px 6px ${colorWithAlpha(primaryColor, 0.06)}`,
        border: `1px solid ${borderColor}`,
      }}
    >
      {!compact && (
        <div className="mb-5 text-center">
          <div
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: brandGradient, color: onPrimary }}
          >
            <Sparkles size={22} strokeWidth={2.4} />
          </div>
          <p className="text-base font-extrabold" style={{ color: textPrimary }}>
            Meet Mate
          </p>
          <p className="mt-1 text-sm" style={{ color: textMuted }}>
            Enter your email and your free fit assessment starts right away.
          </p>
        </div>
      )}

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="Enter your email"
            className="w-full px-4 py-4 text-base rounded-2xl focus:outline-none transition-all"
            style={{
              backgroundColor: sectionBackground,
              border: `2px solid ${error ? '#DC2626' : borderColor}`,
              color: textPrimary,
            }}
            disabled={loading}
            required
            autoFocus={loginOpen}
            data-testid="input-email"
          />
          {error && (
            <p className="mt-2 text-xs" style={{ color: dangerColor }} data-testid="text-error">
              {error}
            </p>
          )}
        </div>

        {gdprEnabled && (
          <div
            className="space-y-2 rounded-lg px-3 py-2 text-xs"
            style={{
              backgroundColor: bgLight,
              color: textMuted,
            }}
          >
            <p>
              By entering your email, you agree to our{' '}
              <a href="https://www.casemateaud.com/privacy-policy" className="font-medium underline" style={{ color: textPrimary }}>
                Privacy Policy
              </a>.
            </p>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded"
                style={{ borderColor, accentColor: primaryColor }}
              />
              <span>I want to receive marketing emails and updates (optional)</span>
            </label>
          </div>
        )}

        <button
          type="submit"
          onMouseDown={(event) => event.preventDefault()}
          disabled={loading || !email}
          className="w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          style={{
            backgroundColor: loading || !email
              ? colorWithAlpha(primaryColor, 0.35)
              : primaryColor,
            color: loading || !email ? colorWithAlpha(onPrimary, 0.45) : onPrimary,
            cursor: loading || !email ? 'not-allowed' : 'pointer',
            boxShadow: loading || !email ? 'none' : `0 10px 24px ${colorWithAlpha(primaryColor, 0.34)}`,
          }}
          data-testid="button-continue"
        >
          {loading ? 'Just a moment...' : 'Start talking with Mate'}
          {!loading && <ArrowRight size={18} strokeWidth={2.6} />}
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-5 text-xs font-medium" style={{ color: textSubtle }}>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />Free to start</span>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />No credit card</span>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />No passwords</span>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />Instant access</span>
      </div>

      {socialProviders.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ backgroundColor: borderColor }} />
            <span className="text-xs font-medium" style={{ color: textSubtle }}>or continue with</span>
            <div className="flex-1 h-px" style={{ backgroundColor: borderColor }} />
          </div>
          <div className={`grid gap-2 ${socialProviders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {socialProviders.map((provider) => (
              <button
                key={provider}
                type="button"
                onClick={() => handleSocialLogin(provider)}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: panelColor,
                  border: `2px solid ${borderColor}`,
                  color: textPrimary,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                <span className="capitalize">{provider}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {guestModeEnabled && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleGuestMode}
            disabled={loading}
            className="text-sm font-semibold transition-colors hover:opacity-70"
            style={{ color: textMuted, cursor: loading ? 'not-allowed' : 'pointer' }}
            data-testid="button-guest-mode"
          >
            Continue as guest
          </button>
        </div>
      )}
    </div>
  );

  // The v107 login panel is rendered via plain function calls (NOT a nested
  // component) so typing in its inputs never remounts the subtree.
  // Public provider IDs control button availability. Secret verification
  // happens during the server-side callback exchange, so a transient status
  // probe can never put an already-configured provider back into “Coming soon”.
  const googleConfigured = isGoogleLoginConfigured();
  const linkedinConfigured = isLinkedInLoginConfigured();
  const smsAuthLive = !!authStatus?.smsAuth;

  const fieldStyle = (hasError = false) => ({
    backgroundColor: sectionBackground,
    border: `2px solid ${hasError ? dangerColor : borderColor}`,
    color: textPrimary,
  });

  const renderComingSoonPill = () => (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
      style={{ backgroundColor: bgMedium, color: textMuted }}
    >
      Coming soon
    </span>
  );

  const renderDivider = (label: string) => (
    <div className="my-4 flex items-center gap-3">
      <div className="h-px flex-1" style={{ backgroundColor: borderColor }} />
      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: textSubtle }}>
        {label}
      </span>
      <div className="h-px flex-1" style={{ backgroundColor: borderColor }} />
    </div>
  );

  const renderGoogleMark = () => (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );

  const renderLinkedInMark = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.94v5.666H9.351V9h3.414v1.561h.047c.475-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9H7.12v11.452z"
      />
    </svg>
  );

  const socialButtonStyle = (enabled: boolean) => ({
    backgroundColor: panelColor,
    border: `2px solid ${borderColor}`,
    color: enabled ? textPrimary : textSubtle,
    cursor: enabled ? 'pointer' : 'not-allowed',
    opacity: enabled ? 1 : 0.7,
  });

  const renderMainView = () => (
    <>
      {/* 1+2 — social sign-in */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={!googleConfigured || !!socialLoading || loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5"
          style={socialButtonStyle(googleConfigured && !socialLoading && !loading)}
          data-testid="button-google-login"
        >
          {socialLoading === 'google' ? <Loader2 size={18} className="animate-spin" /> : renderGoogleMark()}
          <span>Continue with Google</span>
          {!googleConfigured && renderComingSoonPill()}
        </button>
        <button
          type="button"
          onClick={handleLinkedInLogin}
          disabled={!!socialLoading || loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5"
          style={socialButtonStyle(!socialLoading && !loading)}
          data-testid="button-linkedin-login"
        >
          {socialLoading === 'linkedin' ? <Loader2 size={18} className="animate-spin" /> : renderLinkedInMark()}
          <span>Continue with LinkedIn</span>
          {!linkedinConfigured && renderComingSoonPill()}
        </button>
      </div>

      {renderDivider('or')}

      {/* 3 — email: the original OTP-only flow (4-digit emailed code, no password) */}
      {(
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="Enter your email"
            className="w-full rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
            style={fieldStyle(!!error)}
            disabled={loading}
            required
            autoFocus={loginOpen}
            data-testid="input-email"
          />
          <p className="text-xs" style={{ color: textSubtle }}>
            We’ll email you a 4-digit code — no password needed.
          </p>
          {error && (
            <p className="text-xs" style={{ color: dangerColor }} data-testid="text-error">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !email}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all hover:scale-[1.02] sm:text-base"
            style={{
              backgroundColor: loading || !email ? colorWithAlpha(primaryColor, 0.35) : primaryColor,
              color: loading || !email ? colorWithAlpha(onPrimary, 0.45) : onPrimary,
              cursor: loading || !email ? 'not-allowed' : 'pointer',
              boxShadow: loading || !email ? 'none' : `0 10px 24px ${colorWithAlpha(primaryColor, 0.34)}`,
            }}
            data-testid="button-continue"
          >
            {loading ? 'Just a moment...' : 'Start talking with Mate'}
            {!loading && <ArrowRight size={18} strokeWidth={2.6} />}
          </button>
        </form>
      )}

      {renderDivider('or')}

      {/* 4 — phone + SMS code */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: textPrimary }}>
            <Smartphone size={14} />
            Phone number
          </span>
          {!smsAuthLive && renderComingSoonPill()}
        </div>
        <form onSubmit={handlePhoneSend} className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <select
            value={phoneCountry}
            onChange={(e) => setPhoneCountry(e.target.value)}
            disabled={!smsAuthLive || loading}
            className="rounded-2xl px-2 py-3 text-sm font-semibold focus:outline-none"
            style={{ ...fieldStyle(false), opacity: smsAuthLive ? 1 : 0.6 }}
            aria-label="Country code"
            data-testid="select-phone-country"
          >
            {PHONE_COUNTRY_CODES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            inputMode="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value.replace(/[^0-9\s]/g, ''));
              setError('');
            }}
            placeholder="90 123 4567"
            disabled={!smsAuthLive || loading}
            className="w-full min-w-0 flex-1 rounded-2xl px-3 py-3 text-base transition-all focus:outline-none"
            style={{ ...fieldStyle(false), opacity: smsAuthLive ? 1 : 0.6 }}
            data-testid="input-phone"
          />
          <button
            type="submit"
            disabled={!smsAuthLive || loading || !phoneNumber.trim()}
            className="w-full whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold transition-all sm:w-auto"
            style={{
              backgroundColor:
                !smsAuthLive || loading || !phoneNumber.trim() ? colorWithAlpha(primaryColor, 0.25) : primaryColor,
              color: !smsAuthLive || loading || !phoneNumber.trim() ? colorWithAlpha(onPrimary, 0.5) : onPrimary,
              cursor: !smsAuthLive || loading || !phoneNumber.trim() ? 'not-allowed' : 'pointer',
            }}
            data-testid="button-send-otp"
          >
            Send code
          </button>
        </form>
      </div>

      {gdprEnabled && (
        <div
          className="mt-4 space-y-2 rounded-lg px-3 py-2 text-xs"
          style={{
            backgroundColor: bgLight,
            color: textMuted,
          }}
        >
          <p>
            By signing in, you agree to our{' '}
            <a href="https://www.casemateaud.com/privacy-policy" className="font-medium underline" style={{ color: textPrimary }}>
              Privacy Policy
            </a>.
          </p>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 rounded"
              style={{ borderColor, accentColor: primaryColor }}
            />
            <span>I want to receive marketing emails and updates (optional)</span>
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-medium" style={{ color: textSubtle }}>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />Free to start</span>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />No credit card</span>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />Instant access</span>
      </div>

      {guestModeEnabled && (
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={handleGuestMode}
            disabled={loading}
            className="text-sm font-semibold transition-colors hover:opacity-70"
            style={{ color: textMuted, cursor: loading ? 'not-allowed' : 'pointer' }}
            data-testid="button-guest-mode"
          >
            Continue as guest
          </button>
        </div>
      )}
    </>
  );

  const renderBackButton = (label = 'All sign-in options') => (
    <button
      type="button"
      onClick={() => {
        setPanelView('main');
        setError('');
        setAuthNotice('');
      }}
      className="mb-3 inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
      style={{ color: textMuted }}
      data-testid="button-back-to-methods"
    >
      <ChevronLeft size={14} />
      {label}
    </button>
  );

  const renderPhoneCodeView = () => (
    <div>
      {renderBackButton()}
      <p className="text-base font-extrabold" style={{ color: textPrimary }}>
        Enter the code we texted you
      </p>
      <p className="mt-1 text-sm" style={{ color: textMuted }}>
        Sent to <span className="font-semibold" style={{ color: textPrimary }}>{phoneMasked || 'your phone'}</span>
      </p>
      <form onSubmit={handlePhoneVerify} className="mt-4 space-y-3">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={8}
          value={phoneCode}
          onChange={(e) => {
            setPhoneCode(e.target.value.replace(/\D/g, ''));
            setError('');
          }}
          placeholder="000000"
          className="w-full rounded-2xl px-4 py-3.5 text-center font-mono text-xl tracking-[0.35em] transition-all focus:outline-none sm:text-2xl sm:tracking-[0.4em]"
          style={fieldStyle(!!error)}
          disabled={loading}
          autoFocus
          data-testid="input-phone-code"
        />
        {error && (
          <p className="text-xs" style={{ color: dangerColor }} data-testid="text-error">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading || phoneCode.length < 4}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all hover:scale-[1.02] sm:text-base"
          style={{
            backgroundColor: loading || phoneCode.length < 4 ? colorWithAlpha(primaryColor, 0.3) : primaryColor,
            color: onPrimary,
            cursor: loading || phoneCode.length < 4 ? 'not-allowed' : 'pointer',
          }}
          data-testid="button-verify-phone"
        >
          {loading ? 'Verifying...' : 'Verify & continue'}
          {!loading && <ArrowRight size={18} strokeWidth={2.6} />}
        </button>
        <div className="text-center">
          <button
            type="button"
            onClick={() => handlePhoneSend()}
            disabled={loading}
            className="text-xs font-semibold transition-opacity hover:opacity-70"
            style={{ color: textMuted }}
          >
            Resend code
          </button>
        </div>
      </form>
    </div>
  );

  const renderLoginPanel = (compact = false) => (
    <div
      id={loginPanelId}
      className={compact ? '' : 'rounded-3xl p-6 sm:p-8'}
      style={compact ? undefined : {
        backgroundColor: panelColor,
        boxShadow: `0 24px 48px ${colorWithAlpha(primaryColor, 0.14)}, 0 2px 6px ${colorWithAlpha(primaryColor, 0.06)}`,
        border: `1px solid ${borderColor}`,
      }}
    >
      {!compact && panelView === 'main' && (
        <div className="mb-5 text-center">
          <div
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: brandGradient, color: onPrimary }}
          >
            <Sparkles size={22} strokeWidth={2.4} />
          </div>
          <p className="text-base font-extrabold" style={{ color: textPrimary }}>
            Meet Mate
          </p>
          <p className="mt-1 text-sm" style={{ color: textMuted }}>
            Sign in your way and your free fit assessment starts right away.
          </p>
        </div>
      )}

      {panelView === 'phoneCode' ? renderPhoneCodeView() : renderMainView()}
    </div>
  );

  // Checking for a saved session, then handing a verified one to the shell.
  // Both are waits rather than screens, and they are what the customer sits
  // through on a cold open: draw the brand mark for them instead of nothing,
  // which is also what lets the pre-hydration splash hand over to an identical
  // splash rather than to a blank page.
  if (step === 'loading' || step === 'complete') {
    return <BrandSplash />;
  }

  // OTP Code verification screen
  if (step === 'code') {
    return (
      <div
        className="min-h-screen flex flex-col overflow-y-auto"
        style={{ fontFamily: bodyFontStack, background: gateGradient }}
      >
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <BrandMark size={56} />
              </div>
              <h1 className="text-lg font-extrabold tracking-tight sm:text-2xl" style={{ color: textPrimary, fontFamily: headingFontStack }}>
                Check your inbox
              </h1>
              <p className="mt-2 text-sm" style={{ color: textMuted }}>
                We sent a 4-digit code to<br />
                <span className="font-medium" style={{ color: textPrimary }}>{email}</span>
              </p>
              <p className="mt-3 text-xs" style={{ color: textSubtle }}>
                can’t find it? Check your spam or junk folder.
              </p>
            </div>

            <form onSubmit={handleCodeSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  value={code}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setCode(val);
                    setError('');
                  }}
                  placeholder="0000"
                  className="w-full rounded-xl px-4 py-3 text-center font-mono text-xl tracking-[0.35em] transition-all focus:outline-none sm:text-2xl sm:tracking-[0.5em]"
                  style={{
                    backgroundColor: panelColor,
                    border: `2px solid ${error ? '#DC2626' : borderColor}`,
                    color: textPrimary,
                  }}
                  disabled={loading}
                  autoFocus
                  data-testid="input-code"
                />
                {error && (
                  <p className="mt-2 text-xs" style={{ color: dangerColor }} data-testid="text-error">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || code.length !== 4}
                className="w-full py-3.5 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                style={{
                  backgroundColor: loading || code.length !== 4 ? colorWithAlpha(primaryColor, 0.3) : primaryColor,
                  color: onPrimary,
                  cursor: loading || code.length !== 4 ? 'not-allowed' : 'pointer',
                  boxShadow: loading || code.length !== 4 ? 'none' : `0 10px 24px ${colorWithAlpha(primaryColor, 0.34)}`,
                }}
                data-testid="button-verify"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
                {!loading && <ArrowRight size={18} strokeWidth={2.6} />}
              </button>
            </form>

            <div className="text-center mt-6 space-x-4">
              <button
                onClick={handleResendCode}
                disabled={resendCooldown > 0 || loading}
                className="text-sm transition-colors"
                style={{ color: resendCooldown > 0 ? textSubtle : textPrimary }}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
              </button>
              <span style={{ color: textSubtle }}>|</span>
              <button
                onClick={() => { setStep('email'); setCode(''); setError(''); }}
                className="text-sm transition-colors"
                style={{ color: textMuted }}
              >
                Change email
              </button>
            </div>
          </div>
        </div>

        <div className="pb-8 text-center">
          <p className="text-xs" style={{ color: textSubtle }}>
            Your data is private and secure
          </p>
        </div>
      </div>
    );
  }

  // Main email entry screen - landing page first, native login panel on CTA.
  return (
    <>
      {/*
        WYSIWYG kickoff: the founder-chosen landing look replaces ONLY the shell
        region between the START/END markers below. Everything outside it — the
        auth hooks/handlers above, and the login modal + renderLoginPanel() after END —
        is fixed platform infrastructure and is never LLM-regenerated, so
        sign-in / OTP / registration is guaranteed intact after a variant ships.
        A generated shell may use in-scope brand vars (primaryColor, brandName,
        heroVideoUrl, heroHasVideo, openLogin, BrandMark, colorWithAlpha, the
        lucide icons, …) but must not fetch, register, or duplicate auth.
        See server/services/kickoff-email-gate-variants.service.ts.
      */}
      {/* AUDOS:LANDING_SHELL:START */}
    <div className="eg-root h-screen overflow-x-hidden overflow-y-auto" style={{ height: '100dvh', WebkitOverflowScrolling: 'touch', fontFamily: bodyFontStack, backgroundColor: pageBackground }}>
  {/* Adaptive navbar: it never paints a bar of its own. It floats over whatever
      section is underneath (the negative margin pulls the hero up behind it) and
      only swaps its ink — white over the dark hero, near-black ink once a light
      section has scrolled under it. Over light sections the page
      tone (not white) sits behind the links at low strength so content passing
      underneath stays readable without reading as a bar. */}
  <nav
    className="sticky top-0 z-50 w-full"
    style={{
      marginBottom: '-81px',
      backgroundColor: navOverLight ? colorWithAlpha(pageBackground, 0.94) : 'transparent',
      backdropFilter: navOverLight ? 'saturate(140%) blur(10px)' : 'none',
      WebkitBackdropFilter: navOverLight ? 'saturate(140%) blur(10px)' : 'none',
      // A transparent 1px edge in both states keeps the bar exactly 81px tall
      // (the negative margin above depends on it) without ever showing a border.
      borderBottom: '1px solid transparent',
      boxShadow: 'none',
      transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease',
    }}
  >
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-5">
      <div className="flex items-center gap-3">
        <BrandLogoMark size={30} style={{ color: navInk, transition: 'color 0.35s ease' }} />
        <span className="max-w-[45vw] truncate text-sm sm:max-w-none sm:text-base" style={{ fontFamily: headingFontStack, color: navInk, fontWeight: 700, letterSpacing: '-0.01em', transition: 'color 0.35s ease' }}>{brandName}</span>
      </div>
      <div className="hidden items-center gap-5 md:flex" aria-label="Page sections">
        {[
          { label: 'Try Now', id: 'cv-drop' },
          { label: 'Programs Open', id: 'programs-open' },
          { label: 'Product', id: 'toolkit' },
          { label: 'Pricing', id: 'pricing' },
        ].map((link) => (
          <button key={link.id} type="button" onClick={() => scrollToSection(link.id)} className="text-sm hover:opacity-60" style={{ color: navLinkInk, fontWeight: 600, transition: 'color 0.35s ease, opacity 0.2s ease' }}>
            {link.label}
          </button>
        ))}
      </div>
      <button onClick={openLogin} className="shrink-0 rounded-xl bg-[#cc0000] px-3.5 py-2 text-xs hover:-translate-y-0.5 hover:bg-[#b91c1c] sm:rounded-full sm:px-5 sm:py-2.5 sm:text-sm" style={{ color: '#ffffff', fontWeight: 700, transition: 'background-color 0.35s ease, transform 0.2s ease' }}>
        Start free
      </button>
    </div>
  </nav>

  <section id="hero" className="relative flex items-center overflow-hidden" style={{ minHeight: '84svh', backgroundColor: '#0f172a' }}>
    <img
      src={heroImageUrl}
      alt=""
      decoding="async"
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div aria-hidden="true" data-audos-hero-scrim="1" className="absolute inset-0" style={{ background: heroScrim, pointerEvents: 'none' }} />
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0) 100%)', pointerEvents: 'none' }} />
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40" style={{ background: 'linear-gradient(180deg, rgba(2,6,23,0) 0%, rgba(2,6,23,0.4) 100%)', pointerEvents: 'none' }} />
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:py-12">
      <div className={`max-w-3xl transition-all duration-700 ${entered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" style={{ width: 44, height: 3, backgroundColor: primaryColor, flexShrink: 0 }} />
            <span className="break-words text-[11px] uppercase leading-snug sm:text-xs" style={{ color: 'rgba(255,255,255,0.88)', letterSpacing: '0.16em', fontWeight: 700 }}>For Vietnamese Economics &amp; STEM students targeting Internship/Management Trainee/ Graduate Program</span>
          </div>
          <h1 className="mt-7 text-lg leading-snug sm:mt-8 sm:text-5xl md:text-6xl" style={{ fontFamily: headingFontStack, color: '#ffffff', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05 }}>
            <span className="block text-xl sm:text-3xl md:text-4xl">Start to become</span>
            <span className="mt-1 block sm:mt-2" style={{ fontSize: '1.55em' }}>Future Leaders</span>
          </h1>
        </div>
        <p className="mt-5 max-w-3xl text-sm font-light leading-relaxed sm:mt-6 sm:text-base" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Drop your CV, answer a few questions, get your industry fit, function fit, and matched MT programs — with a personalised prep roadmap with a toolkit including Case Solver, Case Drill, Domain Knowledge, Aptitude Test where you can create your own competitive advantage
        </p>
        <div className="mt-8 sm:mt-10">
          <button data-testid="button-open-login" onClick={openLogin} className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm transition-transform hover:-translate-y-0.5 sm:w-auto sm:whitespace-nowrap sm:rounded-full sm:px-8 sm:py-4 sm:text-base" style={{ backgroundColor: primaryColor, color: onPrimary, fontWeight: 700, boxShadow: '0 20px 50px -12px rgba(0,0,0,0.55)' }}>
            Try now
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  </section>

  {/* CV Drop Zone — landing page conversion widget */}
  <section id="cv-drop" className="relative" style={{ backgroundColor: pageBackground }}>
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-5 flex items-center justify-center gap-3">
        <span aria-hidden="true" className="h-0.5 w-8" style={{ backgroundColor: primaryColor }} />
        <span className="text-[11px] font-bold uppercase sm:text-xs" style={{ color: primaryColor, letterSpacing: '0.16em' }}>
          Start here — it&apos;s free
        </span>
      </div>

      <div
        className="rounded-2xl border p-6 sm:p-10"
        style={{
          backgroundColor: '#ffffff',
          borderColor: colorWithAlpha(headingInk, 0.08),
          boxShadow: `0 28px 70px -24px ${colorWithAlpha(headingInk, 0.3)}`,
        }}
      >
        <div className="text-center">
          <h2
            className="text-2xl font-bold leading-tight sm:text-3xl"
            style={{ fontFamily: headingFontStack, color: headingInk, letterSpacing: '-0.025em' }}
          >
            Drop your CV to find your best-fit MT programs
          </h2>
        </div>

        <label
          className="mt-7 flex w-full cursor-pointer flex-col items-center rounded-2xl px-5 py-9 text-center transition-all sm:py-11"
          style={{
            border: `2px dashed ${cvDragOver ? primaryColor : colorWithAlpha(headingInk, 0.2)}`,
            backgroundColor: cvDragOver ? colorWithAlpha(primaryColor, 0.06) : '#f8fafc',
            boxShadow: cvDragOver ? `0 0 0 4px ${colorWithAlpha(primaryColor, 0.08)}` : 'none',
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setCvDragOver(true);
          }}
          onDragLeave={() => setCvDragOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setCvDragOver(false);
            const file = event.dataTransfer.files?.[0];
            if (file) setCvFile(file);
          }}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            className="sr-only"
            onChange={(event) => setCvFile(event.target.files?.[0] || null)}
          />
          {cvFile ? (
            <>
              <CheckCircle2 size={36} color="#16a34a" strokeWidth={2} aria-hidden="true" />
              <p className="mt-4 max-w-full break-all text-sm font-semibold" style={{ color: headingInk }}>{cvFile.name}</p>
              <p className="mt-1 text-xs" style={{ color: textMuted }}>Ready — click to choose a different file</p>
            </>
          ) : (
            <>
              <Upload size={36} color={primaryColor} strokeWidth={1.8} aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold sm:text-base" style={{ color: headingInk }}>
                Drag &amp; drop your CV here, or click to choose a file
              </p>
              <p className="mt-2 text-xs" style={{ color: textMuted }}>PDF, DOCX, or image — supported</p>
            </>
          )}
        </label>

        <button
          type="button"
          onClick={() => {
            if (cvFile) {
              try {
                sessionStorage.setItem('pendingCvName', cvFile.name);
              } catch {}
            }
            openLogin();
          }}
          className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition-transform hover:-translate-y-0.5 sm:text-base"
          style={{
            backgroundColor: primaryColor,
            color: onPrimary,
            boxShadow: `0 20px 50px -12px ${colorWithAlpha(primaryColor, 0.5)}`,
          }}
        >
          Find my program for free
          <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
        </button>

        <p className="mt-4 text-center text-xs" style={{ color: textMuted }}>
          No payment required. Free fit assessment for all users.
        </p>
      </div>
    </div>
  </section>

  <section id="user-companies" className="relative overflow-hidden" aria-labelledby="user-companies-title" style={{ backgroundColor: pageBackground, borderBottom: `1px solid ${colorWithAlpha(borderColor, 0.5)}` }}>
    <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.08),transparent_70%)]" />
    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.24em]" style={{ color: primaryColor }}>Built for ambitious candidates</p>
        <h2 id="user-companies-title" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl" style={{ color: headingInk, fontFamily: headingFontStack }}>Our Users Come From 50+ Companies</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7" style={{ color: textMuted }}>A growing community with experience across leading consumer, consulting, technology, media, and financial-services organizations.</p>
      </div>
      <CompanyLogoGrid />
    </div>
  </section>

  <LandingLivePrograms onStart={openLogin} />

  <section id="toolkit" className="relative" style={{ backgroundColor: sectionBackground, borderTop: `1px solid ${colorWithAlpha(borderColor, 0.5)}` }}>
    <EdgeRail side="left" icons={[Target, LineChart]} />
    <EdgeRail side="right" icons={[BookOpen, GraduationCap]} />
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl" style={{ fontFamily: headingFontStack, color: headingInk }}>Program Striver Toolkit</h2>
        <p className="mx-auto mt-5 max-w-lg text-base font-light leading-relaxed" style={{ color: textMuted }}>One platform. Five tools. Built for MT and consulting candidates.</p>
      </div>

      <div className="relative mx-auto mt-14 max-w-4xl pl-10 sm:pl-16">
        <span className="absolute bottom-8 left-[15px] top-8 w-px sm:left-[31px]" style={{ backgroundColor: colorWithAlpha(primaryColor, 0.25) }} aria-hidden="true" />
        <div className="space-y-5">
          {[
            { icon: Target, title: 'Fit Assessment', desc: 'Match your profile with your desired MT or consulting program. Get industry fit, function fit, and a personalized prep roadmap.' },
            { icon: Sparkles, title: 'Case Solver', desc: 'Access multiple simulation cases tailored to your function and industry. Try the AI Case Room that generates random cases matching your target program.' },
            { icon: LineChart, title: 'Case Drill', desc: 'Sharpen your structure, math, chart interpretation, and market sizing skills with focused micro-drills designed for MT and consulting prep.' },
            { icon: BookOpen, title: 'Domain Knowledge', desc: 'Learn industry fundamentals: value chains, distribution models, real case studies, and domain-specific insights about your target sector.' },
            { icon: GraduationCap, title: 'Aptitude Test', desc: 'Practice with test banks modeled on real MNC online assessment formats. Personalize your practice with AI-powered adaptive support.' },
          ].map((feature, index) => (
            <article key={feature.title} className="relative rounded-2xl p-5 sm:p-7" style={{ backgroundColor: panelColor, border: `1px solid ${borderColor}`, boxShadow: '0 12px 35px -28px rgba(15,23,42,0.45)' }}>
              <span className="absolute left-[-40px] top-7 flex h-8 w-8 items-center justify-center rounded-full border-4 sm:left-[-64px]" style={{ backgroundColor: primaryColor, borderColor: sectionBackground, color: onPrimary }} aria-label={`Step ${index + 1}`}>
                <span className="text-[10px] font-bold">{index + 1}</span>
              </span>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: colorWithAlpha(primaryColor, 0.1), color: primaryColor }}><feature.icon size={20} /></span>
                <div><h3 className="text-lg" style={{ fontFamily: headingFontStack, color: headingInk, fontWeight: 700 }}>{feature.title}</h3><p className="mt-2 text-sm font-light leading-6" style={{ color: textMuted }}>{feature.desc}</p></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section id="pricing" className="relative">
    <EdgeRail side="left" icons={[Layers, BookOpen]} />
    <EdgeRail side="right" icons={[Target, LineChart]} />
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.24em]" style={{ color: primaryColor }}>Pricing</p>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl" style={{ fontFamily: headingFontStack, color: headingInk }}>Choose Your Casemate Plan</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7" style={{ color: textMuted }}>Fit Assessment is always free. Choose a Pro plan when you are ready to use the complete preparation toolkit.</p>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => {
          const detail = plan.id === 'price_monthly_promo' ? `Then ${formatVnd(200000)} / month` : plan.id === 'price_6month' ? `Save ${formatVnd(400000)}` : 'Cancel anytime';
          const interval = plan.days === 180 ? '/ 6 months' : plan.id === 'price_monthly_promo' ? '/ first month' : '/ month';
          return (
            <article key={plan.id} className="relative flex flex-col rounded-3xl p-7" style={{ backgroundColor: panelColor, border: `1px solid ${plan.id === 'price_monthly_promo' ? colorWithAlpha(primaryColor, 0.45) : borderColor}`, borderTop: plan.id === 'price_monthly_promo' ? `4px solid ${primaryColor}` : undefined, boxShadow: `0 24px 55px -38px ${colorWithAlpha(primaryColor, 0.45)}` }}>
              {'badge' in plan && <span className="mb-4 w-fit rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider" style={{ backgroundColor: colorWithAlpha(primaryColor, 0.09), color: primaryColor }}>{plan.badge}</span>}
              <h3 className="text-xl font-extrabold" style={{ color: headingInk }}>{plan.title}</h3>
              <div className="mt-4 flex flex-wrap items-end gap-2"><span className="text-4xl font-extrabold tracking-tight" style={{ color: headingInk }}>{formatVnd(plan.vnd)}</span><span className="pb-1 text-xs font-semibold" style={{ color: textMuted }}>{interval}</span></div>
              <p className="mt-2 text-xs font-bold" style={{ color: primaryColor }}>{detail}</p>
              <ul className="mt-7 flex-1 space-y-3">{['Fit Assessment', 'Case Drill', 'Case Pool', 'Aptitude Test', 'Domain Knowledge'].map((app) => <li key={app} className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: textMuted }}><Check size={16} strokeWidth={2.8} color={primaryColor} />{app}</li>)}</ul>
              <button type="button" onClick={openLogin} className="mt-8 w-full rounded-full py-3.5 text-sm font-extrabold transition hover:-translate-y-0.5" style={{ backgroundColor: primaryColor, color: onPrimary }}>Choose this plan</button>
            </article>
          );
        })}
      </div>
    </div>
  </section>

  <footer className="bg-black text-white">
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div><div className="flex items-center gap-3"><BrandMark size={28} blockColor="#ffffff" /><span className="font-extrabold">{brandName}</span></div><p className="mt-3 text-sm text-white/55">Direction first. Prep second.</p></div>
        <nav className="flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold" aria-label="Company information"><button type="button" onClick={() => setInfoPage('about')} className="text-white/70 hover:text-white">About Us</button><button type="button" onClick={() => setInfoPage('contact')} className="text-white/70 hover:text-white">Contact Us</button><button type="button" onClick={() => setInfoPage('privacy')} className="text-white/70 hover:text-white">Privacy Policy</button></nav>
        <div className="space-y-4"><a href="mailto:support@casemateaud.com" className="block text-sm font-semibold text-white/70 hover:text-white">support@casemateaud.com</a><SocialIconLinks /></div>
      </div>
      <p className="mt-12 border-t border-white/15 pt-6 text-xs text-white/40">© 2025 Casemate. All rights reserved.</p>
    </div>
  </footer>
</div>
      {/* AUDOS:LANDING_SHELL:END */}

      {loginOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto px-0 py-0 backdrop-blur-sm sm:items-center sm:px-4 sm:py-8"
          style={{ backgroundColor: colorWithAlpha(contrastColor, 0.6) }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-gate-login-title"
          onClick={(event) => {
            if (event.target === event.currentTarget && !loading) {
              setLoginOpen(false);
            }
          }}
        >
          <div
            className="relative max-h-[min(92dvh,720px)] w-full max-w-md overflow-hidden overflow-y-auto rounded-t-2xl [overflow-anchor:none] sm:rounded-2xl"
            style={{ backgroundColor: panelStrongColor, boxShadow: '0 30px 70px rgba(0,0,0,0.35)' }}
          >
            <button
              type="button"
              onClick={() => setLoginOpen(false)}
              disabled={loading}
              aria-label="Close login"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:opacity-80 sm:top-5 sm:h-9 sm:w-9"
              style={{ backgroundColor: bgLight, color: textPrimary }}
            >
              <X size={18} strokeWidth={2.6} />
            </button>
            <div className="p-4 sm:p-8">
              <h2 id="email-gate-login-title" className="mb-1 pr-10 text-lg font-extrabold sm:text-2xl" style={{ color: textPrimary }}>
                Welcome to {brandName}
              </h2>
              {panelView === 'main' && (
                <p className="mb-4 text-xs leading-snug sm:text-sm" style={{ color: textMuted }}>
                  Enter your email and you’ll be talking with Mate in seconds — your free MT &amp; consulting fit assessment starts right away.
                </p>
              )}
              {renderLoginPanel(true)}
            </div>
          </div>
        </div>
      )}

      {infoPage && <LandingInfoPage page={infoPage} onClose={() => setInfoPage(null)} onNavigate={setInfoPage} />}
    </>
  );
}

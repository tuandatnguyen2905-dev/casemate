import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  X,
  Sparkles,
  BookOpen,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Check,
  CheckCircle2,
  Upload,
  Target,
  GraduationCap,
  LineChart,
  ArrowLeft,
  BrainCircuit,
  CalendarClock,
  Clock3,
  Compass,
  Dumbbell,
  FileText,
  Grid2X2,
  LockKeyhole,
  Table2,
  Trophy,
  Users,
  Menu,
} from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import type { DesktopThemeTokens } from '../types';
import { isValidEmailFormat, INVALID_EMAIL_MESSAGE } from '../lib/emailValidation';
import { applyCasemateFavicons } from '../lib/siteFavicon';
import BrandSplash from './BrandSplash';
import BrandLogoMark from './BrandLogoMark';
import AcquisitionSourceQuestion from './AcquisitionSourceQuestion';
import { formatVnd, PRICING_PLANS } from '../lib/pricing';
import { getCompanyLogoUrl } from '../data/companyLogos';
import { normalizeManualProgramStatus } from '../lib/programRecruitmentWindow';
const mujiProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAACFABp+ABh6AAqBABmBABmCABmDABmDABl9ABd+ABeqAAD/AACCABhxACeJABNVAAB+ABh+ABg/AAB9ABiNACN+ABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABfBVYjAAAAQHRSTlMA/PsI05JPM7KLdQMBbgYQA1QqBMsMqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGDN5QAAA4FJREFUeNrtmYuO4yAMRe3wDAklSWf2/z91fQ19jdTR7kpDIm3cKgFClSNjG+MSnXLKKaccUua3na8j87cT/0cxkGIu2inSwrcNm/a8mM/H9KIPnn/1o1IGHkQ4k9AstnYcFbTYXmbyGOIRj4kmctoNbTjV4R9V4MAiA0cyMwWuHUfGolUBMfIMKAMegI/hnwaELqyRt6tahgb4nQYVUH7ZR4PKxBtdKP0d4NAREO+8UDwyYKKl+chBAZ204Q5HBGSFuYoTD0p4PECLoGIoI9wcExDRzWuMc38EGHoDSnyRvUT0aPMxAbEvOPERjusxAZUNPuL8QQHb6vL6HlBk2guQ1T/EgTm8XWLaU4OsEQY7snmnwc+cUvZmN8Cax7ClN4DJaya2F6Bteatkha+Akjo3DYbap3EfwEvNE+SFr3FQJrwCmr28uGZat0S0AepBoD5IoZpom7cDYFKAQM2Lm61hl1bjDKGagNPEgkt/QN9srGmQQsvCmvPcbKB2o+kPqEsY6abBosbYBOcBHJ7u3VDndQEsLXxgs0M4zriLDZra0jOfDbTACOrxCme6QjXs9DjVjW50Tl6T5S6KCuh6ea8o1VngxIyO9pXWKa7Ok4nLfiWHBWWEEIqWE3CRbwhBWXvKBLnVQHCVrqhsalj04DFVWxfkDDTLLEzsVt0y4blcg7LVPM9an1mM2UIxy0y9dfdsiRL3Uq0XFR3Y/PNjy6GV24JXKd35cqvKaAzcchTfUBFvkKsEohjFIZBtqYS+ulzAh20Dn4xdRG4VZUM8sRbHvgTDdJz9ansDSjQUnFE+jkeD5faIxKPhAVuGKvMO6EuJvQF146oLPLAeP93qxSjJfgE0jyWe+y4xYvLH8CFL/CFxWCkij3PToI1tiT/N6kYRt5ne/rxZ/lWXuFwFcExig+N0A9SsxtE1whxThEl23kMM38UuAihRJeEkP5TZc5RMZgSg3K02LQxh6gq4SqoXs+yurAcjl8UGR8lYNklzom7CTuMhfMeyutHU1QiTMLFHQlrDjNqgKEpzfKGzHIXc8jpi2EdeewLOtDFOxBKfPWKc41+wweRd0LTKOhMQukkr66Nec98lLn4lk0Pwl9VfqAR5uY8JT0LM4YqGtxJ/ok8xubi62D/Reg1sNcGa7vnMblnC3QqRac34B2lBavOCalrVQ6/mcT3llFNOOeUf5DctfSLOH5X2CwAAAABJRU5ErkJggg==';
const cpGroupProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAAAAqVIAqFIAplEAp1EAtFgAp1EAplEA/wAAqVMAqVIAf38Avz8AmU0A/38AfwAAfz8AmjkA//8AmWYAVVUAzGYAf1IAsk4AvHoAjTgAjE8AqjoAn08AzDMA/1UAsVMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8WZGXAAAAQHRSTlMA9gpvjf1PLAHRrgIEDgICBAcBBQMFBw4ECQkKIAUDKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAg3rUdQAAA0xJREFUeNrtWdmO2zAMpKhbtnxks9m7/f+/7IycYFv0uZAKmEDgIy+DIWdIyiJnnHHGGf9RpBZjQtNt+n7YdBoL3h3Penuvdd/uiAdiD/A0uJLNEbm4EPF+FBaBIxTjictZBJHiKYgsY/An1XnjQv3t3RZt9iXKCGm+JM3eNSSLzrM+4dd0bI2PI2R5mYu3Iq+S/mB1SRL9CAhVLPDBYt4vpFNipQ+mD03PQFgGoFBNXnVJNUeIeZJsgRmoAe0Z2EPvMpwPECrOO16CNzUBruHbZcqlt5IXKeZVfkiE/aHgFFYIoOJghpp2XG+9LeZqCvrIlR5dqFwCnQjXMNfBdJbJihK0UHAAY0BWeUGui8/Z53qRin/nvk0kotiegKio8QWGrfjBAYP1hgLJri9AqiJSybAaQCJ7Lb2Zr5w8S+mskg1V9ynUriYKJEPIrEP0YaT5tkrJkjq7jEEPdnBkKgIVd5uYa6EHGligy71t0DUY3iVdlMJoDEaUZeBlCIAf6WCQFKIUW/FhvB4H4J6OdM6KujOK+5h+fAF03qcBAFqmWOHSF9EZCi65qZdsOqlDAIytIZvCId/RYt5EXo5eN3e3mcMHF6QSQz42ERQeZmtb4Ij5J/qMYFrY+ncSBZSAHud925k8bzBjg7qtd6tLj267cq373ups5KCD8dV0HwgFQ0xqyQZflZ04KtcnjPyiidPM2nniL+hyrZspMVqfAWg6Thnan91XksCV5P70lQDwI905my7aptfOWydmBH2goN/k/TEecKDuv9ZdQWG53qW6EeB9gU9ox94NsLovAFUAap5I3Futx8mRcggrQxxyLWy74X6iheVYj9YBQWeVbe0Nb5J0ZePNNn4fzjzFgNbi3iRFbssDxG55oAWHLs4VHsOhlUTKJNreKgmq78Gi4mLguRvH/lycjUpNyx5cVx0vEpy1QPb3YaVGQI8BjNZL11khOEwvkYSJWhTcxPvX9hAtmLT60jfFL2DKgccQASjAo207PYoaeNRqu6uDLqKhJRpMhgCcYA1JJ2Yb5xEknGgrEeWGlCIAjyfVgFpllGjOvEcJEciUNH7qzhId55PO+hgQrH2gGu+DU5IJczU1m9ZBP4edccYZZ5zxD+IXKTEa7pUGshgAAAAASUVORK5CYII=';
const maerskProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUfGSKd3+kiHyB11ONp6/Ft0+Ng0uSH2+na6OgiHh9jAABisbxVqvAzmZk/v/9/f/8iIB4AAP8Af38Af/9VAFV/f3+E2eb/qqoAAABbyNkkICEjHiBj1eciHh4kICAcGxwA//9dzuAiIiIjHiAjICE/v78jHiBcy90iHh4jHR0iHh4mGRljzNwiICBVqqpcy9xbydkiHiBJttk7AAAjICAiHR7///9t1OQkHCE8ADwjHiBy1uWu5usjICE6OjoiHh+Pv599AAAAQHRSTlMaJ1RnDpf4YA7NAgYEBQQChwECAgMCiQMA/f31/PC2EQH+E7PNBM3YTi1wFfMxBWmPcQcEd4wE0DcEkLAXlASobo6mvQAABTBJREFUeNrtmFd36jgQgF2ouWX77kSSJYqjYBsny6WG+v//1Y6KC8EQHmA356zngSPJsvg83Xbgk4tTA9aANWANWAPWgDcE7J2RTwLYWJzb9dL7DIAI8eVHlXz5pi/+14A9aDSfq6XV/AFl7SZiIPKJECLJDhOOGBR7csHF/SCfC3tvtqCnepO9MXFEBWADGow99ivlkTWPzD+iAfGyyZBSaQ4UkgbZGDgNcqEeRMWUhiO8PiP5QhgBpDjVd8Z4dtepAPwJmuyxJONxecZ8fIICkFBCLciqGI+IkpFZl7iei4cAJUGUqJhRMtT3asAZTuWgwsQ9+PZcJmptWv0y4N/wdARISWw1RQJitYZMuC6zddrlQy2cp7CiNOBqziVuSvUzmmuSEG6OxFPWeBoXUAn48nxE5G/YZUDznKlm0kemuDrC2cgCFl6AElGjIfxH1LgCNE8yhVEY7vSRwUDgU5F1dZCcALr+ZUALsiY5ICINYah+7Gz0DtCB6cMUosAChmUOZeJI8cVwHeB48SGgAklwZE3saGZlusgCHuL5BGUe54BlDVI6tzKygF2814PLgOMxsy4Iro0SxsangESi6yDIBDEs4A51It5ESMjc+mAWBaEGVD6IMuQ4MoB5mMTWawLyM9r8IiBrbzQia4K77Gs8/09WAchnyrcRh3oGUOAfTCD3dgVoJAcsgHCDcyDZBmqChASKMP5Ag63lwt1gPsS0otIOY82tyypMTIaJyi6K1DGAMf7fYT1fzwMFOlUmjtNIySq1gDoJqjyY6phKV0rSOckAU3mFD7INgNtkzAXwW0t/Cy7rVwFywIPnGBJegoAJvBV5zwTNSRTTYDUQKW6amMqR2L+OszQTCCdEHc4+CBI0LiK2t/Znu2w9VmrQ6IR0pwpwAF5uMGUzTwPGiRUsblmamSB/8rBX+0N9KSkAB+BIJJx8EMWsDV+L+mfLS4UGMaNoa2LakI5KL1KYuovDbskHTUZKsyjuqofbK1ArgfbB1Lgu6pAe67AizaB5vyvEXqMBWa45BvR0lvWUOROlG6or16jARxXKcm3zwMG9jknnNmpLsjM+iI4CUajm+8uAy05PtwYLcFl1HuR8pxIL52gOgeUKJnx4yCvUmvNYXRyWSl2EY/NfE8w1WIRiLq2EO+yG0lAOdVMU8ZCHowuALbb0F/CLBfQZ658CnsrDbZtAcT4PsmW7aKxw1GkvFeJHgPdvWA0g2/gnOxb+kn0SQNRep7N1t9ttx/T4aui6HRe1+DkAx1bYFvtX+ALtYuUYcJ3nKk95eLxbmdkE15P1+oCyO6yT25vYNqvLv3rQgZe8X+i/NzE1LRWmhZlqGWTWU4dYdiNCMTJR5OpegFhMvi/QGxudZXW7BZQfAYbS9tGhTrnx/YIk66ZVBcGKAht2BvBYgyH3sBHeZ4AT2N8XcOyi9+mK4l8JGGJnHWML829p8EVXEGy92lcDwsGoUvUtkisX5HcDZJuFbWGai/HVgAkNHQNIpK5vu/sB+tkbMvbX7ErAPb4gc5DWB+9r4vEmf3vKh2cAfy80qDrPWMq7BQn2fs+tLA+WXu4yE7++BxTmm0sJUL2CmiBxsEUVYnBbwK/wevTp40j6/Qb8Vmo2qGk3MV7nJUBsVbUPZm3qTRM19HpPzT47Jz78WrrpLZ7FKJNZBKsZKsqzbx/JDAcDcxElua2JlZVfqwUTd+MzfGFdnN/2jm+6nypRsXAUD3oyfdMXp2+3/0bdeDojf9Rf+WvAGrAGrAFrwBrw/wr4D2bjybgDbQ2hAAAAAElFTkSuQmCC';
const fastRetailingProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAADrABv4AAbtABvpABrtABvoABrOABPnABq4AAPuABvQAC7zACp/AAC3ACeZAAD/ACD/AFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABq+FfOAAAAQHRSTlMA/AXUVTCKCXQErwYNAgYF/wMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJl3c0gAAAtZJREFUeNrtmYtyozAMRW1JfmLS3f//2b2SIWm2nemSmoSdokkCyDacynrY1LlTTjnllEMIjZafZsCptZHmS22sCZPLfqzUHIbaz8WRdBxDGjzBAy0IuoJbFjok4C50wwD3ohvjg6AjS6e7JJniMn9LelSUHbNzKmm7lGmRsjPdgCnYmY5cyLJRcs7haXWXHggSjvK8Sd2cZhAV81OXCpsAnxCz3wB8Ad0GwNfQ/WsleRmdVRKJX0h+Hd1hsvFjW6lUurx2F0RO6qfyzGT8QJAA7yCz+kmaWVaf7piAy+qzHGb7fQf4ynz3NeAR6W6AB6WzNwtxXd8ds1ZgRS3/QyU7Mh5NfW+xQOphvm031jY7rtuQ3maK65j1au99Ctnng27LeEdjgVpQmXFseusQ9AsxixBO4KLUNf1QXNJGKGdCo/VqOEPzpF3TUMLl/SC/ueoFD6veV2JofmV9dNC24MQyZekpUwM/W/iT2BjcIgQfoQh6N/SnkXkw+pgznoMVggNJjBwEqSeHDliz51lwyPl3yBWdW2JfbeAdoKfop4CB3l8G+qE+p+lUg8Pro8TUCms5CNcLiElGH/wVFbb6AJizn1QR8si1xlJJyDErDGa3qul8bNQBYUFfbIrFNRgJLgg8zPHfgMzRJyiChDYYEMvTRL7CMGDC8hCEsOACaGTiuQK8mZslz+g6L4C0AmZ4LhQBXtwcDQUkmzvz/6QBIe8Bsxig9B2WAvaICR0w9IkHIBy3E6urjPVB5A/HXgQOqDNlFqwroDicqwW5Ehlgta65A8KydQFEmDV8ax878gWmojCcKnHUWBE7Q4sCssyRiwDbM1wLnQtrACkWp653woSOLrIOQJoaW0zKRQEndfYCBHslufxaHbRSfdHdnV5fHBUtZ3PCQFzOqif00Hp+UdMl9/RSt3U8jWd690N0V35pfShdG+i6Prjq6VaEf97/Ek855ZTjyh8Okxpz31gnUgAAAABJRU5ErkJggg==';
const knaufProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAAAApOwAnuQApOwAqPkApOwAoukApOwApe4A//8AoekAf/8Avv8Al9UAmukAAP8Af38As/4AnuYAqqoAi80ApNYAVaoAnuYAf7wAneYAkbYAf9QAjeIAzP8AAH8AP38AVf8AZpkAbbYAZswAmZkAttoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA57sK+AAAAQHRSTlMA/PxRCM5uLq8BjwIEDBABAv9wAwsNA4wGKgcGCQUCBAMFBwUFBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyxVYGgAABAZJREFUeNrtWdl23CgQLVqsQiD1areTzJbM///i1AZx5jXNOXpQPRiBZHOpqnspMMBhhx122I4skR1u+A2z9l7tfbfxhWqMOZkJrvsEmCEYsoBP+4wvTOg/YyqkvXrwYk4n477vNQffYaYUjHt1IOKK5MEZke7UNkcAL5CTJYOVfjKjeYCps1m1xKqEtupr29r+eoTKnEhl7E79xypzIpUpE1lZuFkRuqWHAGmD56SGq7C/PnyBMHUboFVXUhmUmQIwn405uzyxLFr4Bp4GZlgwTc9GbIIum/zauJu0bGcP5fUq40kGXUlBQ419bgu8ycACll6dZFgXdFuR/fgQpe2vr68HKCqTZT6XCZYhVlukN8e+qpSr4y68oC039j8i/8Ko7aipzBp0RwaZD3Xx4WheAjgzJgWospmF/R5ujgZcRJtvA1jy0HnUgYnmNZyUlSe2kK40FC8C9w91XGf/XdtRMn2Tv39XBybLsaLQBga4ajUxzzRc4Ss7zENnf+D4hrTYlAeqjGcH2lbbEARmQ4R/mTZmmsWvtjms1RhdBYZYU5mWga22IWReYvmNs9LUKACDfA/K/qqkeS//fBkBctF5dLakfRI4URkPmotAiejedUF1ldfCfvocLT5GAHxrEkFg7CLz0ZCN5pPwzQKw6IK2XmNssWvQiIoog/59ysC6pr9I/ATuFIW2wu9pMwJQ5BmI7bym4uR7RvtylqxUywgenP1v9MDqmkPenCTdjdu7ZYBdntfSagzTzY+Q6Wp6hHgfKBxJiuOJQV+FFRGewpyPTypz+qkyU0DDUu31AJ+ydiVxUfELLc4RhMyet2rstiOgksVqO+rQmlVVnrqdWPXXRwP4BldNRf4wNlluKtNI854fOa+DVIYyLcr0KoOzUoUws+dMjE6+UFlutcyjk2aMBxfdgrX508oRz6saUiwvP2WIyCEOeyRZwgxp7IkmQeyO4SpVapVJI0mx5A+42OOIi8Py8villvGDTv2YNE4c0La6rBlXlNhfpYhoPpybysCmKlOGnmhWuGumSe3kVfQqcAQp9uxaF6YQ5UNekAth5pCHwfcmW/fcFrsncf7Ncq5hLNOsHhPXefhUPrNut1pmDEl6LQONLEFScuEH3YFxAVdrFaA/k4DLCYTksKnNKBLzwc2UpEezOslBrmBu0ZOXCFZYfzjuQ42ft7Y6+N4kw9OjTQnPwNhevA3+cvGcUVPr43u6TuA+ujr7SNu3i/TZtr97E9ot7rdaPlikoJ2clmGXbwsaSUSih0X6zEhLTym199pHhHJbg7+Q6fJhl/cma0pp/d+9yT4vdq59B9rp5aLWGlg07hbgPOos8sITjdzj7NUWW6stcNhvKc7xf8jDDjtsh/YfgYEmL5LUlmUAAAAASUVORK5CYII=';
const shopeeProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAADuTSz8UjD/AADzTi3xTS3/fwD1Ti3vSivzTS3/VVX8PjvzTS3yTS33UC70VDD8VQP2UC7aRyV/AAD3UC6/Pz/2UC73UC71UC3/f3/bPR7MNDL//wCqVQDVVi3yPBOqVVW/Pwf/ZjOZMzNVAADXJyf/fz////9/AH9/fwCqAFW5RRe2SCSqVSrQRRflTBkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpHtVSAAAAQHRSTlMA+/4B0G0CsBFRAwUyjLAQAzEJApIETNJwAggFAQMGCAMFBQUDBgQBAgIDCwcGCwoAAAAAAAAAAAAAAAAAAAAABFPtNAAABWFJREFUeNrtmGmX6igQhgk7hISgWVxa7eUus8///3dTRRYT227tuX3sfLDOMUqI4aGAlyoIudvd7na3rzUGNmc8i1cp58pXwMdrD4jz5JNEC54kvHTgyxnyWWIaGi0pFzMktEQAmqiDyClVfj03wjVxCXDF3yKh2exc+DPllHuS7mRagC8TB8gzm4A0CSSNYpMSRRWxM5JmBkxZZIqFLQNa3dXMRqM5FcdR9Qk1cyFboG32C0Da60Vb+utPwN23v7967zANby0BiT7aUGryx68c5i1MveRdo3z7lYqToqJcABzNU5mmVra4diu/BpCeltXgwF53qht6tEL5m9DxhieTW3kf2zBSBCGMa5eNEe4WQ28ngJRHbXGC07EHZcdXx1gi4QIkctmAKqU3ARyP5iOpswxcQ/KBEHZl2/JlAKdyBW7mmnxTtwHckTAaTq1V9JEyPBkBVvDgI7q6xFjCiyYr1kt+G0A5AgSUTnMmczCLHDZuhW02oCHyvh2gO6IImb/WnIEDxlSiBxk69CzgUdDZtNht+W+W3rHlGDA7J4odB4sBztqyrnkE3GnooZ3kW4MCxW4MlcSi521fKTH5Ka7SUUb0kYUvvDqVQQwabBdvJyt8b0EGD5Knp95Rceh11SZexQKvh03vS6xN9bZPxuC6vzY1YxC3jFbxgpg8mSLSOgKyZQHwyujOVwjoSs5zEyGgo6sc8y2NbjO0hCJU1i0hw9e2lTF2DxmHUrgmJGbkiZ/ooF9xOvVg0fk6j/mUiV0HQBB0NKXJAyMBNRJvGPIdnM15m37lWLlGhYqVqO1rzH1iSVzhQ0Ze+GQnaQT4fjUeaDcINalRBCn4RSJgkigh4I7SknkoCocKTx3D2UC5MCaDLw0eXWG/goFnAvsB/oWRcEZhZ3aXAZcTf+Fmlzvi+GtAwh5gmiERRrbfkChuebiMSIn5Ak5DTlVMaUDLwepYGbroV8dEYsNhNaJltH3okvFXywJe6saAgyLsEDUofOCF46JOq+eojxpBtAQZckgacy4viz0O9gYvLlqNiQRc6gCF4Ibp876d0756hD2JCVglSaWgVcwQIJEhqTQQkEF/tFxi/R8cWgWi+CcpoSKAQCXdgUASK7sSxV5tLwvhOcBMquGu7qWiE7VnxHGkE+oYbZAArmnlJsqPgBCI9SIWxi00Yay1dHV5M5JEnRXn/BSQ9Vpc2HAK+AOG2AE5iK9vncT9Dv6QttkhTIKd1mmqD4fN7/A817Gk/70m3ymOMT81dRwGWHpej9S7lzKU6TVuCdD+PxNAH7eZ2Ik480FHVmRpLe6PaolPuC5ZPDzgfF11+Ya+IqK0o6TEgdo2KKh+RM3/boUYD0bMAtdiPBh5GQPqWOuefvNZXLY4igIqdYZoBc4XA+q1ME3JnrE280uyqbnyl7fkapw1ZbDsv8OL98d7lC/bzd2j2HKVKZA6nv58VEdAVAs8eOIoQSXx7TrgZR4FQT6gSlKeY5EfHh5T3E9zhYG7v+zCSVICkSCE9CYbB9T58GidJ93hHGwPpJl40EK4jbVcELaFV6oyPtsYFFFYK20x/hOQVm1onocrhvgka+rl4HXOxKClYDIIuEOcbKvSdWNfZm0YEIwJOKvSuIqdyITpjhmhUhtjat1HZToMpV/NO0eHSMdoiZ2dzP0XvlLJyV1WTF7R3b3qLHwcEJ4FFKNTLlalNu1CvsIu+0Cwa13aKqK3HmQp5NDHnrCiqo4dY7KqiitD1pgMvW3cf/jgIx2E+pOOtYjI81ydMbgt/Mdb+mzAC6/6eENxDn5qUm8lk2+Y/R/tfD7g55+Z6QO52y+ee999cLe73W2m9h+zdToANnayHAAAAABJRU5ErkJggg==';
const jtiProgramLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAAwFBMVEUAAAAAsoYAt4kA//8BqHwAf38DtIYA/wAAt4cAqqoHtXoAqlUAt4kFtIcA/38Ar4MAxJMCqoYAtokBtYgAnHMA/6oAmZkAAP8AbUgfn18AzJkFwI0AxZQ/fz9VqlUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTdX1oAAAAQHRSTlMA+68BDwIpAVMDDQPSFQL8/xSUcAkDBQEHCAUttgQDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwL6DwAAAblJREFUeNrtmddywyAQRZcuEMioxOn5/88MCNW4PyRLZrgPLrJmdOYgVrAGKCkpKfnvUSm54rEznzITaAZjDDciU3/OkhQrIUNGDb2fAH0HA7au0wiVj8FLV/9yjnPu3CuCMbUm8L20/DROuPFweDFo9SNFzmO5Cx2Ww38+xJ9mDefn+YjlBAdQXDBGDrs3QrEAzVo/5nQyhC5fKzkG2eDGF32Lx6vl5ptOxAKMl3brKFsZ5mgjjs0KWGshRM3wAOPVuh++9NZgnOYK06AyYrnjqGD5AUINdI9TAAtgASyABbAA/hpgWO+0oPIFDHzV32/qHjFIW4TWx/2Atoq/5QloiCedgwajdXQDsEmb0/4j6HtC6SVcBawSYFp8I3XedoDNDpDKZU4IpjHghNgAHkgPZgEMJaWHDBpFTG0MOnheDQZ9Ar0V+C4jJk3+7DygYbcc7z7QgOwvbohpayaDXbsZUOeAYetjmvqxYxoAD2MRrrc9L409urH4TssTO+rbFWGWQzP/mFoelnqLVoSv179U7bzvDM4z7I5ZQm0QmKW+uQ4aN+A9w26niU+2poaMk/HfgyUlJSWP5Bt/1BMNwIEiFwAAAABJRU5ErkJggg==';
import type { LandingFeaturePage } from './features/LandingFeaturePages';
import { applyPublicSeo, PUBLIC_PAGE_SEO } from '../lib/publicSeo';

const CompanyLogoGrid = lazy(() => import('./CompanyLogoGrid'));
const LandingInfoPage = lazy(() => import('./LandingInfoPage'));
const LandingFeaturePages = lazy(() => import('./features/LandingFeaturePages'));
const SocialIconLinks = lazy(() => import('./SocialIconLinks'));

const SOCIAL_OAUTH_SUCCESS_PATH = '/#fit-assessment';
const WORKSPACE_SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

function prefetchEntitlement(sessionId: string) {
  void import('../lib/proAccess').then(({ prefetchCasemateEntitlement }) => {
    void prefetchCasemateEntitlement(sessionId);
  });
}

// Version marker for auto-upgrade detection
// Increment this when making breaking changes that stale copies need
export const EMAIL_GATE_VERSION = 147; // v147: the email sign-in panel asks the optional "Bạn biết Casemate từ đâu?" question (stored as acq_source_reported once the session exists). v146: temporarily marks every social sign-in method as Coming soon and keeps email OTP as the only active sign-in path. v145: Google OAuth preserves the current app path in returnUrl so shared-host and preview sign-in are accepted as safe. v144: keeps the configured Google button active in draft and published surfaces while retaining the platform-owned canonical account handoff. v143: Google uses the platform-owned OAuth callback, validates the canonical session, and restores it from the HttpOnly cookie before entering the app. v142: removes phone/SMS sign-in, isolates email draft state for responsive typing, and serves the hero as prioritized WebP with a PNG fallback. v141: the application calendar shows every active dated program in a seamless infinite marquee. v140: all landing program data now comes from the unified programs catalog. v139: OAuth state/PKCE is persisted server-side for 10 minutes; invalid or consumed callbacks return to the login modal. v138: "Programs Expecting to Open" marquee now falls back to apply_url when career_url is absent, and caps the visible set at 8 programs (data then sourced from the wider legacy program catalog). v137: OAuth sessions receive a seven-day browser cookie and immediate sliding server renewal. v136: the emailed-code screen sits on the light gate surface with near-black heading ink. v135: opens Product directly into the trial, adds explicit sample submissions with feedback CTAs, and uses canonical VND pricing. v134: adds trial tab navigation, brand typography, pricing conversion cards, and deterministic case grading. v131: removes Case Arena navigation and the inline preview-before-signup block.  v129: adds Case Arena navigation plus larger, linked program cards with industries, function tracks, and featured Knauf/JTI programs. v125: embeds program logos as data URLs so the space compiler does not require a PNG module loader. v124: adds normalized local logos for every company in the current 30-day program window. v123: restores logo-first ordering, guaranteed logo motion, uniform logo sizing, program-type cards, and the 30-day display window. v122: corrects the live application calendar cards, exact brand accents, date windows, and landing-section order. v121: adds full-color uniform logo and live-program marquees with database-driven application windows. v119: adds durable company marks, live program windows, VND pricing, product navigation, and full-page company information views. v118: adds early social proof with a responsive, monochrome company-logo grid. v117: verified OTP, OAuth, and phone sessions eagerly prefetch the shared Pro entitlement cache. v116: Facebook sign-in is greyed out and inert while Facebook OAuth is unavailable; LinkedIn uses the white Google-style button. v115: successful Google/Facebook/LinkedIn callbacks enter #fit-assessment directly instead of restoring the public root first. v113: Facebook now returns to /auth/callback/facebook, the route this gate consumes so callback failures remain visible. v110: email sign-in reverted to OTP-only — password fields, sign-up tabs and the reset flow are removed; Google & Facebook remain on the server-verified OAuth callback flow. v109: Google/Facebook use production OAuth authorization-code callbacks with fixed redirect URIs and server-side code exchange; Facebook is active whenever its App ID is configured. v108: social sign-in is server-verified — Google/Facebook send provider tokens to casemate-auth-v1 before a session exists. v107: multi-method sign-in — email+password, Google/Facebook OAuth, and phone/SMS OTP

type ProductTrialPage = 'landing' | 'fit-assessment' | 'case-drill' | 'case-pool' | 'aptitude-test' | 'case-arena';
type PublicLandingPage = 'landing' | LandingFeaturePage;

type LandingProgramRow = {
  id: number;
  program_id: string;
  program_name?: string | null;
  company?: string | null;
  rubric_program_name?: string | null;
  program_type?: string | null;
  open_date?: string | null;
  active?: boolean | null;
  version?: number | null;
  career_url?: string | null;
  apply_url?: string | null;
  display_status?: string | null;
};

type LandingProgram = {
  row: LandingProgramRow;
  company: string;
  program: string;
  programType: string;
  openDate: Date;
  openDateLabel: string;
  statusLabel?: string;
  industry?: string;
  tracks?: readonly string[];
  link?: string;
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
  { aliases: ['Shopee'], color: '#EE4D2D', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/f_webp,q_auto,e_trim,c_fit,w_160,h_80/https://logo.clearbit.com/shopee.com' },
  { aliases: ['Central Retail'], color: '#E01A22', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/2200a6c5-0680-4e68-b49b-421bee1e01bc.png' },
  { aliases: ['Techcombank'], color: '#D0021B', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/techcombank.com.vn' },
  { aliases: ['JTI', 'Japan Tobacco'], color: '#003087', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/8bb64456-402c-43b0-9a0e-5e726cd5f00b.png' },
  { aliases: ['MUJI'], color: '#7F0019', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/4868f81a-38da-431d-b548-3250ced09973.png' },
  { aliases: ['C.P. Group', 'C.P Group', 'CP Group', 'C.P. Vietnam'], color: '#E31837', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/f_webp,q_auto,e_trim,c_fit,w_160,h_80/https://logo.clearbit.com/cpgroupglobal.com' },
  { aliases: ['Maersk'], color: '#42B0D5', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/f_webp,q_auto,e_trim,c_fit,w_160,h_80/https://logo.clearbit.com/maersk.com' },
  { aliases: ['Fast Retailing'], color: '#E40521', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/f_webp,q_auto,e_trim,c_fit,w_160,h_80/https://logo.clearbit.com/fastretailing.com' },
  { aliases: ['Knauf'], color: '#009FE3', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/c6a02e60-2376-47eb-9ee2-4fbb4a2f9125.png' },
  { aliases: ["L'Oréal", 'Loreal'], color: '#A50034', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/loreal.com' },
  { aliases: ['Unilever'], color: '#1F36C7', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/4b442312-ddbc-4fbf-9e04-35354ffc752d.png' },
  { aliases: ['Nestlé', 'Nestle'], color: '#009A44', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/4f3b4dec-149a-42bf-be81-4770337e7494.png' },
  { aliases: ['MoMo'], color: '#A50064', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/momo.vn' },
  { aliases: ['Viettel'], color: '#CC0000', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/viettel.com.vn' },
  { aliases: ['AB InBev'], color: '#F5A800', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/105908bd-9e37-412c-a0c9-efa1290c8774.png', darkText: true },
  { aliases: ['Home Credit'], color: '#E31837', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/homecredit.vn' },
  { aliases: ['Carlsberg'], color: '#006835', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/7812e23e-7533-41d0-a660-4c9df8968b07.png' },
  { aliases: ['P&G', 'Procter & Gamble'], color: '#003087', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/ef4ef2fe-299a-4738-9bf1-181ee79bb9c6.png' },
  { aliases: ['Deloitte'], color: '#86BC25', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/e761e5b4-2159-48f3-95af-a840f2a14331.png' },
  { aliases: ['EY'], color: '#FFE600', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/ey.com', darkText: true },
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
  { aliases: ['Panasonic'], color: '#0041C0', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/panasonic.com' },
  { aliases: ['PMAX'], color: '#ED1C24', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/d71f69ce-761e-4b71-bc9b-76fbff88d52b.png' },
  { aliases: ['Masan Group', 'Masan'], color: '#E31837', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/masangroup.com' },
  { aliases: ['UNIQLO', 'Uniqlo'], color: '#FF0000', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/58a529af-1787-42c2-9102-98ebc5adf3b6.png' },
  { aliases: ['NAB Innovation Centre', 'NAB'], color: '#C20000', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/nab.com.au' },
  { aliases: ['Crystal International'], color: '#006B54', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/crystalgroup.com' },
  { aliases: ['OPPO'], color: '#1FA463', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/oppo.com' },
  { aliases: ['DKSH'], color: '#E30613', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/0f34067a-3e31-48a3-856f-31d7aeef2b5c.png' },
  { aliases: ['Starbucks'], color: '#00754A', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/f39744e8-e72e-4247-a352-90cf409a1a25.png' },
  { aliases: ['HSBC'], color: '#DB0011', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/hsbc.com.vn' },
  { aliases: ['Standard Chartered'], color: '#0072AA', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/34d6175f-1ec8-438e-a41f-227b17cbea07.png' },
  { aliases: ['Zalo'], color: '#0068FF', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/zalo.me' },
  { aliases: ['MSB'], color: '#E65300', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/msb.com.vn' },
  { aliases: ['Bosch'], color: '#EA0016', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/bosch.com.vn' },
  { aliases: ['Techtronic Industries', 'TTI'], color: '#E31B23', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/9e8a22b9-0dcb-487f-8298-61d76fd4155c.png' },
  { aliases: ['SPX', 'Shopee Xpress'], color: '#EE4D2D', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/spx.vn' },
  { aliases: ['Schneider Electric'], color: '#3DCD58', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/98a6b4bf-969a-40f4-9f77-8a5771d51df5.png', darkText: true },
  { aliases: ['Mondelēz Kinh Đô', 'Mondelez Kinh Do', 'Mondelēz Vietnam', 'Mondelez Vietnam'], color: '#4F2170', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/mondelezinternational.com' },
  { aliases: ['ACB'], color: '#005BAC', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/ec9b9843-5ef9-4778-be74-739160b113dd.png' },
  { aliases: ['Vinamilk'], color: '#0072BC', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/9ee3504c-007b-450e-b369-fd7c057d3771.png' },
  { aliases: ['BAT', 'British American Tobacco'], color: '#1B365D', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/f6942620-508b-42fc-9076-108ee023fce0.png' },
  { aliases: ['VNG'], color: '#F58220', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/4176c716-9b3f-495c-96dd-aa3c01657f6b.png' },
  { aliases: ['Louis Dreyfus Company'], color: '#009A44', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/a54a302e-d031-4760-a90b-00569a88032b.png' },
  { aliases: ['Hitachi Energy'], color: '#F00000', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/58920530-9f4a-4938-a8a7-61cf60fdd673.png' },
  { aliases: ['Manulife'], color: '#00A758', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/manulife.com.vn' },
  { aliases: ['Decathlon'], color: '#3643BA', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/decathlon.vn' },
  { aliases: ['VPBank'], color: '#007A33', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/vpbank.com.vn' },
  { aliases: ['Expeditors'], color: '#374151', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/expeditors.com' },
  { aliases: ['UOB'], color: '#374151', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/uob.com' },
  { aliases: ['Prudential'], color: '#374151', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/prudential.com.vn' },
  { aliases: ['PropertyGuru'], color: '#374151', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/propertyguru.com' },
  { aliases: ['CapitaLand Development', 'CapitaLand Vietnam', 'CapitaLand'], color: '#005BAC', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/0ec26f72-af80-452f-9c23-43134ae80241.png' },
  { aliases: ['Colgate-Palmolive', 'Colgate Palmolive', 'Colgate'], color: '#005CB9', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/be0c4eef-f031-4b44-bfce-c986c0c0c450.png' },
  { aliases: ['ITL & SOTRANS', 'ITL', 'SOTRANS'], color: '#005CB9', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/5fe68020-ae6c-4281-b5f1-f504c41c07b1.png' },
  { aliases: ['FPT Long Châu', 'FPT Long Chau', 'Long Châu', 'Long Chau'], color: '#1F4AA8', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/general/8b31cc46-74b4-4af5-8a60-59a424c3aace.png' },
  { aliases: ['Abbott'], color: '#374151', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/abbott.com' },
  { aliases: ['McKinsey'], color: '#374151', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/mckinsey.com' },
  { aliases: ['Bain'], color: '#374151', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/bain.com' },
  { aliases: ['Goldman Sachs'], color: '#374151', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/goldmansachs.com' },
  { aliases: ['KPMG'], color: '#374151', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/kpmg.com' },
  { aliases: ['PwC'], color: '#374151', logoUrl: 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim,w_160,h_80,c_pad,b_white/https://logo.clearbit.com/pwc.com' },
];

const DEFAULT_LANDING_BRAND: LandingCompanyBrand = { aliases: [], color: '#374151' };

function normalizeLandingCompany(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function landingCompanyBrand(company: string) {
  const normalized = normalizeLandingCompany(company);
  const configuredBrand = LANDING_COMPANY_BRANDS.find((brand) =>
    brand.aliases.some((alias) => normalized.includes(normalizeLandingCompany(alias)))
  );
  const reusableLogoUrl = getCompanyLogoUrl(company);

  if (configuredBrand) {
    return reusableLogoUrl ? { ...configuredBrand, logoUrl: reusableLogoUrl } : configuredBrand;
  }
  return reusableLogoUrl
    ? { aliases: [company], color: '#374151', logoUrl: reusableLogoUrl }
    : DEFAULT_LANDING_BRAND;
}

function landingCompanyInitials(company: string) {
  return company.split(/\s+/).filter(Boolean).slice(0, 3).map((word) => word[0]).join('').toUpperCase() || 'P';
}

const LANDING_PROGRAM_TRACKS = [
  { companyAliases: ['Nestlé', 'Nestle'], programAliases: ['Nesternship'], tracks: ['Marketing', 'Market Research', 'Sales', 'Supply Chain', 'Finance', 'Data Analytics', 'Legal', 'HR', 'Manufacturing'] },
  { companyAliases: ['AB InBev'], programAliases: ['Dreamship'], tracks: ['Commercial & Strategy', 'Finance', 'Marketing', 'Supply Chain', 'Tech & Analytics', 'Legal'] },
  { companyAliases: ['Techcombank'], programAliases: ['Future Gen'], tracks: ['Technology', 'Data & AI', 'Digital', 'General Management', 'Business'] },
  { companyAliases: ['MoMo'], programAliases: ['Talent'], tracks: ['Product', 'Growth', 'Product Growth'] },
  { companyAliases: ['Viettel'], programAliases: ['Future Changemakers'], tracks: ['Business', 'Technology', 'Customer'] },
  { companyAliases: ['Central Retail'], programAliases: ['MA 2026', 'Management Associate'], tracks: ['Food Retail', 'Non-Food', 'Property'] },
  { companyAliases: ['EY'], programAliases: ['Vietnam Tax', 'Tax 2027'], tracks: ['Transfer Pricing', 'GCR', 'International Tax', 'Indirect Tax', 'People Advisory'] },
  { companyAliases: ['Unilever'], programAliases: ['ULMA', 'ULP'], tracks: ['Marketing', 'Sales', 'Supply Chain', 'Finance', 'R&D', 'HR', 'IT'] },
  { companyAliases: ["L'Oréal", 'Loreal'], programAliases: ['Management Trainee'], tracks: ['Marketing', 'Sales', 'Finance', 'Operations', 'Digital'] },
  { companyAliases: ['Suntory PepsiCo', 'PepsiCo'], programAliases: ['MT', 'Management Trainee'], tracks: ['Sales', 'Marketing', 'Supply Chain', 'Finance'] },
  { companyAliases: ['Shopee'], programAliases: ['Graduate Development'], tracks: ['Product Management', 'Operations', 'Data', 'Engineering', 'Business Development'] },
  { companyAliases: ['P&G', 'Procter & Gamble'], programAliases: ['LeadGen'], tracks: ['Sales', 'Brand', 'Finance', 'HR', 'IT', 'Supply Chain'] },
  { companyAliases: ['Knauf'], programAliases: ['Management Trainee'], tracks: ['Marketing', 'Sales', 'Finance', 'Engineering', 'Operations', 'HR'] },
  { companyAliases: ['JTI', 'Japan Tobacco'], programAliases: ['Management Trainee'], tracks: ['Marketing', 'Sales', 'Finance', 'Supply Chain', 'Corporate Affairs'] },
] as const;

const LANDING_INDUSTRY_DEFAULTS = [
  { aliases: ['Nestlé', 'Nestle', 'AB InBev', 'Unilever', "L'Oréal", 'Loreal', 'Suntory PepsiCo', 'PepsiCo', 'P&G', 'Procter & Gamble', 'JTI', 'Japan Tobacco', 'Carlsberg', 'Coca-Cola', 'Heineken', 'Kimberly-Clark', 'Perfetti Van Melle', 'FrieslandCampina', 'Abbott'], industry: 'FMCG / Consumer Goods', tracks: ['Marketing', 'Sales', 'Finance', 'Supply Chain', 'HR', 'Operations'] },
  { aliases: ['Techcombank', 'UOB', 'ACB', 'VPBank', 'HSBC', 'MSB', 'NAB', 'Goldman Sachs', 'Home Credit', 'Prudential', 'Manulife'], industry: 'Banking / Financial Services', tracks: ['Finance', 'Technology', 'Digital', 'Risk', 'Business'] },
  { aliases: ['Central Retail', 'Fast Retailing', 'Uniqlo', 'Decathlon', 'MUJI', 'Starbucks'], industry: 'Retail', tracks: ['Merchandising', 'Operations', 'Finance', 'Marketing', 'Expansion'] },
  { aliases: ['Maersk', 'Expeditors', 'SPX', 'Shopee Xpress', 'DKSH'], industry: 'Logistics / Supply Chain', tracks: ['Operations', 'Sales', 'Finance', 'Technology'] },
  { aliases: ['MoMo'], industry: 'Fintech', tracks: ['Product', 'Technology', 'Finance', 'Marketing', 'Operations'] },
  { aliases: ['Shopee', 'Viettel', 'TikTok', 'Samsung', 'Garena', 'VNG', 'Zalo', 'OPPO'], industry: 'Technology', tracks: ['Product', 'Technology', 'Data', 'Marketing', 'Operations'] },
  { aliases: ['Deloitte', 'EY', 'BCG', 'Boston Consulting Group', 'McKinsey', 'Bain', 'KPMG', 'PwC'], industry: 'Consulting / Professional Services', tracks: ['Consulting', 'Strategy', 'Finance', 'Risk', 'Technology'] },
  { aliases: ['Knauf', 'Bosch', 'Schneider Electric', 'Techtronic', 'TTI', 'Panasonic', 'Hitachi', 'Texas Instruments'], industry: 'Building Materials / Engineering', tracks: ['Marketing', 'Sales', 'Finance', 'Engineering', 'Operations', 'HR'] },
] as const;

function landingIndustryDefaults(company: string) {
  const normalized = normalizeLandingCompany(company);
  return LANDING_INDUSTRY_DEFAULTS.find((entry) => entry.aliases.some((alias) => normalized.includes(normalizeLandingCompany(alias))));
}

function landingProgramTracks(item: LandingProgram): readonly string[] {
  if (item.tracks?.length) return item.tracks;
  const company = normalizeLandingCompany(item.company);
  const program = normalizeLandingCompany(item.program);
  return LANDING_PROGRAM_TRACKS.find((entry) =>
    entry.companyAliases.some((alias) => company.includes(normalizeLandingCompany(alias)))
    && entry.programAliases.some((alias) => program.includes(normalizeLandingCompany(alias)))
  )?.tracks || landingIndustryDefaults(item.company)?.tracks || ['Business', 'Finance', 'Marketing', 'Operations'];
}

function landingProgramIndustry(item: LandingProgram) {
  return item.industry || landingIndustryDefaults(item.company)?.industry || 'Business / General Management';
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
  const name = (row.rubric_program_name || row.program_name)?.toLowerCase() || '';
  if (name.includes('intern')) return 'Internship Program';
  if (name.includes('management trainee') || name.includes('leader') || name.includes('leadership')) return 'Leadership Program';
  return 'Graduate Program';
}

function landingOpenDateInWindow(value?: string | null, now = new Date()): Date | null {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const candidateYears = [today.getFullYear() - 1, today.getFullYear(), today.getFullYear() + 1];
  const matches = landingDateParts(value)
    .flatMap(({ day, month }) => candidateYears.map((year) => new Date(year, month - 1, day)))
    .filter((openDate) => {
      const windowStart = new Date(openDate);
      windowStart.setDate(windowStart.getDate() - 15);
      const windowEnd = new Date(openDate);
      windowEnd.setDate(windowEnd.getDate() + 60);
      return today >= windowStart && today <= windowEnd;
    })
    .sort((a, b) => a.getTime() - b.getTime());
  return matches[0] || null;
}

function landingCalendarProgram(row: LandingProgramRow): LandingProgram | null {
  if (row.active === false) return null;
  const manualStatus = normalizeManualProgramStatus(row.display_status);
  if (manualStatus === 'closed') return null;
  const windowOpenDate = landingOpenDateInWindow(row.open_date);
  if (!windowOpenDate && !manualStatus) return null;
  const now = new Date();
  const openDate = windowOpenDate || new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const statusLabel = manualStatus === 'open'
    ? 'Open now'
    : manualStatus === 'opening_soon' && !(windowOpenDate && windowOpenDate > now) ? 'Opening soon' : undefined;

  const fallbackName = splitLandingProgramName(row.rubric_program_name || row.program_name || '');
  const company = row.company?.trim() || fallbackName.company;
  const program = row.program_name?.trim() || fallbackName.program;
  if (!company || !program) return null;

  return {
    row,
    company,
    program,
    programType: inferLandingProgramType(row),
    openDate,
    openDateLabel: `${String(openDate.getDate()).padStart(2, '0')}/${String(openDate.getMonth() + 1).padStart(2, '0')}`,
    statusLabel,
    link: row.career_url?.trim() || row.apply_url?.trim() || '',
  };
}

function optimizedProgramLogoUrl(url: string) {
  if (url.startsWith('data:') || url.includes('res.cloudinary.com/')) return url;
  return `https://res.cloudinary.com/asfzhhej/image/fetch/f_webp,q_auto,e_trim,c_fit,w_256,h_128/${url}`;
}

function LandingProgramLogo({ company, duplicate = false }: { company: string; duplicate?: boolean }) {
  const brand = landingCompanyBrand(company);
  const logoUrl = brand.logoUrl ? optimizedProgramLogoUrl(brand.logoUrl) : undefined;
  const initials = (
    <span className="absolute inset-0 flex items-center justify-center rounded-lg text-[10px] font-black" style={{ backgroundColor: brand.color, color: brand.darkText ? '#111827' : '#ffffff' }} aria-label={duplicate ? undefined : `${company} initials`}>
      {landingCompanyInitials(company)}
    </span>
  );
  if (logoUrl) {
    return (
      <div className="rounded-lg" style={{ width: 128, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', backgroundColor: '#ffffff' }}>
        {initials}
        <img src={logoUrl} alt={duplicate ? '' : company} width={128} height={64} className="rounded-lg" style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%', objectFit: 'contain', position: 'relative', backgroundColor: '#ffffff' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} loading="lazy" decoding="async" />
      </div>
    );
  }
  return <div className="relative h-16 w-32">{initials}</div>;
}

function LandingProgramCard({ item, duplicate = false }: { item: LandingProgram; duplicate?: boolean }) {
  const brand = landingCompanyBrand(item.company);
  const tracks = landingProgramTracks(item);
  const industry = landingProgramIndustry(item);
  const card = (
    <article className={`flex min-h-[320px] w-full flex-col rounded-2xl border border-t-4 border-[#e5e7eb] bg-white p-5 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.45)] ${item.link ? 'group-hover:border-[#cc0000]' : ''}`} style={{ borderTopColor: brand.color }}>
      <div className="flex h-20 items-center"><LandingProgramLogo company={item.company} duplicate={duplicate} /></div>
      <h3 className="mt-4 text-base font-extrabold leading-6 text-[#111827]">{item.company} — {item.program} · {item.statusLabel || `Opens: ${item.openDateLabel}`}</h3>
      <p className="mt-1 text-[11px] font-semibold text-[#6b7280]">{industry}</p>
      <p className="mt-3 text-[11px] leading-5 text-[#4b5563]" aria-label={`Available functions: ${tracks.join(', ')}`}>
        <span className="font-extrabold text-[#111827]">Functions:</span> {tracks.join(', ')}
      </p>
      <span className="mt-auto w-fit rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide" style={{ backgroundColor: `${brand.color}14`, color: brand.color }}>
        {item.programType}
      </span>
    </article>
  );
  const sharedClass = 'group block w-[280px] shrink-0 snap-start rounded-2xl transition-transform duration-200';
  if (!item.link) return <div className={sharedClass} aria-hidden={duplicate || undefined}>{card}</div>;
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={duplicate ? -1 : undefined}
      aria-hidden={duplicate || undefined}
      className={`${sharedClass} cursor-pointer hover:-translate-y-1 hover:shadow-[0_22px_55px_-24px_rgba(204,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cc0000]`}
    >
      {card}
    </a>
  );
}

function LandingProgramSequence({ items, duplicate = false }: { items: LandingProgram[]; duplicate?: boolean }) {
  return (
    <div className={`flex shrink-0 gap-5 pr-5 ${duplicate ? 'casemate-program-duplicate' : ''}`} aria-hidden={duplicate || undefined}>
      {items.map((item) => <LandingProgramCard key={`${duplicate ? 'copy-' : ''}${item.row.program_id}`} item={item} duplicate={duplicate} />)}
    </div>
  );
}

function DeferredCompanyLogoGrid() {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: '600px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-24">
      {ready && <Suspense fallback={null}><CompanyLogoGrid /></Suspense>}
    </div>
  );
}

function DeferredSocialIconLinks() {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: '400px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-11">
      {ready && <Suspense fallback={null}><SocialIconLinks /></Suspense>}
    </div>
  );
}

function DeferredLandingLivePrograms(props: { onStart: () => void }) {
  const [ready, setReady] = useState(false);
  const placeholderRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = placeholderRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: '600px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (ready) return <LandingLivePrograms {...props} />;
  return (
    <section ref={placeholderRef} className="border-y border-[#e5e7eb] bg-white" aria-labelledby="landing-programs-placeholder-title">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#cc0000]">UPCOMING APPLICATION CALENDAR</p>
        <h2 id="landing-programs-placeholder-title" className="mt-4 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">Programs Opening for Applications</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6b7280]">Programs opening within the next 15 days or opened within the last 60 days — use the arrows to browse the current list.</p>
      </div>
    </section>
  );
}

function LandingLivePrograms(_props: { onStart: () => void }) {
  const useWorkspaceDB = (window as any).useWorkspaceDB as WorkspaceDbHook;
  const programListRef = useRef<HTMLDivElement | null>(null);
  const { data, loading } = useWorkspaceDB<LandingProgramRow>('programs', {
    shared: true,
    columns: ['id', 'program_id', 'program_name', 'company', 'rubric_program_name', 'program_type', 'open_date', 'active', 'career_url', 'apply_url', 'display_status'],
    filters: [{ column: 'active', operator: 'eq', value: true }],
    limit: 500,
  });
  const programs = (data || [])
    .map((row) => landingCalendarProgram(row))
    .filter((item): item is LandingProgram => item !== null)
    .sort((a, b) => a.openDate.getTime() - b.openDate.getTime() || a.company.localeCompare(b.company) || a.program.localeCompare(b.program));

  if (!loading && programs.length === 0) return null;

  const scrollPrograms = (direction: -1 | 1) => {
    const list = programListRef.current;
    if (!list) return;
    const cardsPerPage = Math.max(1, Math.floor(list.clientWidth / 300));
    list.scrollBy({ left: direction * cardsPerPage * 300, behavior: 'smooth' });
  };

  return (
    <section id="programs-open" className="border-y border-[#e5e7eb] bg-white" aria-labelledby="landing-live-programs-title">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#cc0000]">UPCOMING APPLICATION CALENDAR</p>
          <h2 id="landing-live-programs-title" className="mt-4 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">Programs Opening for Applications</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6b7280]">Programs opening within the next 15 days or opened within the last 60 days — use the arrows to browse the current list.</p>
        </div>
        {loading ? (
          <div className="mt-10 flex items-center justify-center gap-2 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-8 text-sm font-semibold text-[#6b7280]"><Loader2 className="h-4 w-4 animate-spin" />Syncing application windows…</div>
        ) : (
          <>
            <div className="mt-8 flex items-center justify-center gap-3" aria-label="Application Calendar controls">
              <button
                type="button"
                onClick={() => scrollPrograms(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d1d5db] bg-white text-[#111827] shadow-sm transition hover:border-[#cc0000] hover:text-[#cc0000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cc0000]"
                aria-label="View previous programs"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-extrabold text-[#374151]">Browse program list</span>
              <button
                type="button"
                onClick={() => scrollPrograms(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d1d5db] bg-white text-[#111827] shadow-sm transition hover:border-[#cc0000] hover:text-[#cc0000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cc0000]"
                aria-label="View next programs"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div
              ref={programListRef}
              className="-mx-4 mt-6 flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-4 pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6"
              role="region"
              aria-label="Programs expected to open for applications"
            >
              <LandingProgramSequence items={programs} />
            </div>
          </>
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

type EmailLoginFormProps = {
  initialEmail: string;
  loading: boolean;
  error: string;
  sectionBackground: string;
  borderColor: string;
  textPrimary: string;
  textSubtle: string;
  dangerColor: string;
  primaryColor: string;
  onPrimary: string;
  onSubmit: (event: React.FormEvent, value: string) => void;
  onClearError: () => void;
};

// Keep draft input state local so a keystroke does not re-render the entire
// landing page. The parent receives the final value only when the form submits.
function EmailLoginForm({
  initialEmail,
  loading,
  error,
  sectionBackground,
  borderColor,
  textPrimary,
  textSubtle,
  dangerColor,
  primaryColor,
  onPrimary,
  onSubmit,
  onClearError,
}: EmailLoginFormProps) {
  const [value, setValue] = useState(initialEmail);
  const disabled = loading || !value;

  return (
    <form onSubmit={(event) => onSubmit(event, value)} className="space-y-3">
      <input
        type="email"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          if (error) onClearError();
        }}
        placeholder="Enter your email"
        className="w-full rounded-xl px-4 py-3 text-sm transition-transform focus:outline-none"
        style={{
          backgroundColor: sectionBackground,
          border: `2px solid ${error ? dangerColor : borderColor}`,
          color: textPrimary,
        }}
        disabled={loading}
        required
        autoFocus
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
        disabled={disabled}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-transform hover:scale-[1.02] sm:text-base"
        style={{
          backgroundColor: disabled ? colorWithAlpha(primaryColor, 0.35) : primaryColor,
          color: disabled ? colorWithAlpha(onPrimary, 0.45) : onPrimary,
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: disabled ? 'none' : `0 10px 24px ${colorWithAlpha(primaryColor, 0.34)}`,
        }}
        data-testid="button-continue"
      >
        {loading ? 'Just a moment...' : 'Start talking with Mate'}
        {!loading && <ArrowRight size={18} strokeWidth={2.6} />}
      </button>
    </form>
  );
}

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

const TRIAL_CASES = [
  { title: 'Reviving a Legacy Coffee Brand', industry: 'FMCG', difficulty: 'Intermediate', time: '35 min' },
  { title: 'A Retailer’s Southeast Asia Expansion', industry: 'Retail', difficulty: 'Advanced', time: '45 min' },
  { title: 'Digital Bank Growth Strategy', industry: 'Financial Services', difficulty: 'Intermediate', time: '40 min' },
  { title: 'Last-Mile Delivery Profitability', industry: 'Logistics', difficulty: 'Advanced', time: '45 min' },
  { title: 'New Product Launch for Gen Z', industry: 'Consumer', difficulty: 'Beginner', time: '30 min' },
  { title: 'Hospital Network Capacity', industry: 'Healthcare', difficulty: 'Intermediate', time: '35 min' },
] as const;

const APTITUDE_QUESTIONS = [
  {
    question: 'A product’s price rises from $80 to $92. What is the percentage increase?',
    answers: ['10%', '12%', '15%', '18%'],
    correct: 2,
  },
  {
    question: 'All associates are analysts. Some analysts are mentors. Which statement must be true?',
    answers: ['All mentors are associates', 'Some associates are mentors', 'All associates are analysts', 'No analysts are mentors'],
    correct: 2,
  },
  {
    question: 'What number comes next: 3, 7, 15, 31, …?',
    answers: ['47', '55', '62', '63'],
    correct: 3,
  },
] as const;

function ProductTrialPages({
  page,
  onBack,
  onNavigate,
  onSignUp,
  brandName,
  headingFontStack,
  bodyFontStack,
}: {
  page: Exclude<ProductTrialPage, 'landing'>;
  onBack: () => void;
  onNavigate: (page: Exclude<ProductTrialPage, 'landing'>) => void;
  onSignUp: () => void;
  brandName: string;
  headingFontStack: string;
  bodyFontStack: string;
}) {
  type MockTier = 'Needs structure' | 'Developing' | 'Proficient';
  type MockGrade = { score: number; tier: MockTier };

  const [fitAnswers, setFitAnswers] = useState<Record<number, number>>({});
  const [fitCvName, setFitCvName] = useState('');
  const [fitSubmitted, setFitSubmitted] = useState(false);
  const [lockedCase, setLockedCase] = useState<(typeof TRIAL_CASES)[number] | null>(null);
  const [drillAnswer, setDrillAnswer] = useState('');
  const [drillGrade, setDrillGrade] = useState<MockGrade | null>(null);
  const [poolAnswers, setPoolAnswers] = useState<Record<string, string>>({});
  const [poolGrades, setPoolGrades] = useState<Record<string, MockGrade>>({});
  const [aptitudeAnswers, setAptitudeAnswers] = useState<Record<number, number>>({});
  const [aptitudeSubmitted, setAptitudeSubmitted] = useState(false);
  const score = APTITUDE_QUESTIONS.reduce((total, question, index) => total + (aptitudeAnswers[index] === question.correct ? 1 : 0), 0);
  const aptitudeComplete = Object.keys(aptitudeAnswers).length === APTITUDE_QUESTIONS.length;
  const scrollToTrialResult = (id: string) => {
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
  };
  const trialTabs = [
    { page: 'fit-assessment', name: 'Fit Assessment' },
    { page: 'case-drill', name: 'Case Drill' },
    { page: 'case-pool', name: 'Case Pool' },
    { page: 'aptitude-test', name: 'Aptitude Test' },
  ] as const;
  const activeTrialTab = trialTabs.find((item) => item.page === page) || trialTabs[0];

  const gradeAnswer = (answer: string): MockGrade => {
    const trimmed = answer.trim();
    const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
    if (wordCount < 10) return { score: 38, tier: 'Needs structure' };
    if (wordCount < 30) return { score: 62, tier: 'Developing' };
    return { score: 81, tier: 'Proficient' };
  };

  const signupButton = (label = 'Sign up to unlock full access') => (
    <button
      type="button"
      onClick={onSignUp}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-5 py-3 text-sm font-extrabold text-[#FFFFFF] shadow-[0_8px_24px_rgba(31,41,55,0.16)] transition hover:-translate-y-0.5 hover:bg-[#B91C1C]"
    >
      {label}<ArrowRight className="h-4 w-4" />
    </button>
  );

  const GradeFeedback = ({ grade, mode, resultId }: { grade: MockGrade; mode: 'drill' | 'pool'; resultId: string }) => {
    const observations = grade.tier === 'Proficient'
      ? ['Clear quantitative framing', 'Logical structure from the start']
      : grade.tier === 'Developing'
        ? ['Recognized the core trade-off', 'Made an initial estimate']
        : ['Attempted an answer', 'Identified the problem space'];
    const improvement = grade.tier === 'Proficient'
      ? 'Add sensitivity analysis — what if volume is 20% lower?'
      : grade.tier === 'Developing'
        ? 'Structure first: state your approach before computing numbers'
        : 'Use MECE structure: split the problem into mutually exclusive parts, then solve each';
    const tierColors = grade.tier === 'Proficient'
      ? { backgroundColor: '#DCFCE7', color: '#166534', barColor: '#16A34A' }
      : grade.tier === 'Developing'
        ? { backgroundColor: '#FEF3C7', color: '#92400E', barColor: '#D97706' }
        : { backgroundColor: '#FEE2E2', color: '#B91C1C', barColor: '#DC2626' };

    return (
      <section
        id={resultId}
        className="mt-5 scroll-mt-24 overflow-hidden rounded-2xl border border-[#FEE2E2] bg-[#FFFFFF] shadow-sm"
        style={{ animation: 'trialFeedbackIn 280ms ease-out both' }}
        aria-live="polite"
      >
        <div className="p-5 sm:p-6">
          <span className="inline-flex rounded-full px-3 py-1.5 text-sm font-extrabold" style={{ backgroundColor: tierColors.backgroundColor, color: tierColors.color }}>
            {grade.score}/100 · {grade.tier}
          </span>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F3F4F6]" aria-label={`Score ${grade.score} out of 100`}>
            <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${grade.score}%`, backgroundColor: tierColors.barColor }} />
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-black text-[#111827]" style={{ fontFamily: headingFontStack }}>{mode === 'drill' ? 'What worked' : 'Key observations'}</h3>
              <ul className="mt-3 space-y-2">
                {observations.map((observation) => <li key={observation} className="flex gap-2 text-sm leading-6 text-[#1F2937]"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#16A34A]" />{observation}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-[#111827]" style={{ fontFamily: headingFontStack }}>{mode === 'drill' ? 'To improve' : 'Next step to improve'}</h3>
              <p className="mt-3 text-sm leading-6 text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>{improvement}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-[#FEE2E2] bg-[#FEF2F2] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm font-bold text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>{mode === 'drill' ? 'Want real AI-powered feedback on your answers?' : 'Ready for detailed feedback across full case briefs?'}</p>
          <button type="button" onClick={onSignUp} className="shrink-0 rounded-xl bg-[#DC2626] px-4 py-2.5 text-sm font-extrabold text-[#FFFFFF] hover:bg-[#B91C1C]">
            {mode === 'drill' ? 'Continue with Pro — from 150.000₫' : 'Unlock real graded cases — from 150.000₫'}
          </button>
        </div>
      </section>
    );
  };

  const PricingConversion = () => (
    <section className="bg-[#F9FAFB] px-4 pb-12 sm:px-6 sm:pb-16" aria-label="Casemate pricing options">
      <div className="mx-auto max-w-6xl rounded-2xl border border-[#FEE2E2] bg-[#FEF2F2] p-5 sm:p-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#DC2626]" style={{ fontFamily: bodyFontStack }}>Casemate Pro</p>
          <h2 className="mt-2 text-2xl font-black text-[#111827] sm:text-3xl" style={{ fontFamily: headingFontStack }}>Choose the plan that fits your preparation</h2>
          <p className="mt-3 text-sm leading-6 text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>Fit Assessment and your personalized roadmap stay free. Upgrade when you want the complete practice toolkit.</p>
        </div>
        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => {
            const featured = plan.id === 'price_monthly_promo';
            const interval = plan.days === 180 ? '/ 6 months' : plan.id === 'price_monthly_promo' ? '/ first month' : '/ month';
            const detail = plan.id === 'price_monthly_promo' ? `Then ${formatVnd(200000)} / month` : plan.id === 'price_6month' ? `Save ${formatVnd(400000)}` : 'Cancel anytime';
            return (
              <article key={plan.id} className={`relative flex flex-col rounded-2xl border bg-[#FFFFFF] p-5 shadow-sm sm:p-6 ${featured ? 'border-[#DC2626]' : 'border-[#FEE2E2]'}`}>
                {'badge' in plan && <span className="mb-3 w-fit rounded-full bg-[#FEE2E2] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#DC2626]">{plan.badge}</span>}
                <h3 className="text-lg font-black text-[#111827]" style={{ fontFamily: headingFontStack }}>{plan.title}</h3>
                <div className="mt-3 flex flex-wrap items-end gap-2"><span className="text-3xl font-black tracking-tight text-[#111827]">{formatVnd(plan.vnd)}</span><span className="pb-1 text-xs font-semibold text-[#1F2937]">{interval}</span></div>
                <p className="mt-2 text-xs font-bold text-[#DC2626]" style={{ fontFamily: bodyFontStack }}>{detail}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm font-semibold text-[#1F2937]">
                  {['Case Pool', 'Case Drill', 'Aptitude Test', 'Domain Knowledge'].map((item) => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#DC2626]" />{item}</li>)}
                </ul>
                <button type="button" onClick={onSignUp} className={`mt-6 rounded-xl px-4 py-3 text-sm font-extrabold transition ${featured ? 'bg-[#DC2626] text-[#FFFFFF] hover:bg-[#B91C1C]' : 'border border-[#DC2626] bg-[#FFFFFF] text-[#DC2626] hover:bg-[#FEF2F2]'}`}>Choose {formatVnd(plan.vnd)}</button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );

  const TrialHeader = () => (
    <header className="sticky top-0 z-[70] min-h-16 border-b border-[#FEE2E2] bg-[#FFFFFF]">
      <div className="mx-auto grid min-h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={onBack} className="flex min-w-0 items-center gap-2 text-left" aria-label={`Back to ${brandName} home`}>
          <BrandLogoMark size={30} style={{ color: '#DC2626' }} />
          <span className="hidden truncate text-base sm:inline" style={{ fontFamily: headingFontStack, color: '#111827', fontWeight: 700, letterSpacing: '-0.01em' }}>{brandName}</span>
        </button>
        <nav className="hidden h-full items-stretch justify-center sm:flex" aria-label="Trial features">
          {trialTabs.map((item) => {
            const active = item.page === page;
            return (
              <button key={item.page} type="button" onClick={() => onNavigate(item.page)} className={`relative px-2.5 text-xs transition md:px-4 md:text-sm ${active ? 'font-bold text-[#DC2626]' : 'font-semibold text-[#374151] hover:text-[#DC2626]'}`}>
                {item.name}
                {active && <span className="absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-[#DC2626] md:inset-x-4" aria-hidden="true" />}
              </button>
            );
          })}
        </nav>
        <div className="relative mx-auto sm:hidden">
          <span className="inline-flex items-center gap-1 rounded-full border border-[#FEE2E2] bg-[#FEF2F2] px-3 py-2 text-xs font-bold text-[#DC2626]">
            {activeTrialTab.name}<ChevronDown className="h-3.5 w-3.5" />
          </span>
          <select
            aria-label="Choose a trial feature"
            value={activeTrialTab.page}
            onChange={(event) => onNavigate(event.target.value as (typeof trialTabs)[number]['page'])}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          >
            {trialTabs.map((item) => <option key={item.page} value={item.page}>{item.name}</option>)}
          </select>
        </div>
        <button type="button" onClick={onSignUp} className="shrink-0 rounded-xl bg-[#DC2626] px-3 py-2.5 text-xs font-extrabold text-[#FFFFFF] hover:bg-[#B91C1C] sm:px-4 sm:text-sm">Sign up free</button>
      </div>
    </header>
  );

  const TrialFooter = () => (
    <section className="border-t border-[#FEE2E2] bg-[#FFFFFF] px-4 py-12 text-center sm:px-6">
      <h2 className="text-2xl font-black tracking-tight text-[#111827]" style={{ fontFamily: headingFontStack }}>Ready to keep going?</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>Create your free account to save progress and unlock Casemate’s complete preparation experience.</p>
      <div className="mt-6">{signupButton()}</div>
    </section>
  );

  const FitAssessment = () => {
    const questions = [
      { question: 'Which work environment energizes you most?', options: ['Fast-moving consumer brand', 'Structured financial institution', 'Technology-led scale-up'] },
      { question: 'Which challenge would you choose first?', options: ['Shape a go-to-market plan', 'Improve operational efficiency', 'Build a financial model'] },
      { question: 'What kind of impact motivates you?', options: ['Influence customer behavior', 'Transform an organization', 'Launch a new business'] },
    ];
    const fitComplete = questions.every((_, index) => fitAnswers[index] !== undefined);
    const fitProfiles = [
      { industry: 'FMCG / Consumer', function: 'Marketing & Growth', programs: 'Unilever Future Leaders · L’Oréal SeedZ · Nestlé Management Trainee' },
      { industry: 'Financial Services', function: 'Strategy & Operations', programs: 'Techcombank Future Gen · UOB Management Associate · Prudential Graduate Program' },
      { industry: 'Technology', function: 'Product & Business', programs: 'Shopee Graduate Development · MoMo Talent · Viettel Future Changemakers' },
    ];
    const fitProfile = fitProfiles[questions.reduce((total, _, index) => total + (fitAnswers[index] || 0), 0) % fitProfiles.length];
    const submitFit = () => {
      if (!fitComplete) return;
      setFitSubmitted(true);
      scrollToTrialResult('fit-trial-result');
    };
    return (
      <>
        <main className="bg-[#F9FAFB] px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-[#FEE2E2] bg-[#FFFFFF] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[#DC2626]">Direction</span>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-[#111827] sm:text-5xl" style={{ fontFamily: headingFontStack }}>Find the career path that fits you.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>Share a little about your experience and preferences. Casemate turns it into a focused industry, function, and program direction.</p>
            </div>

            <div className="mt-10 space-y-6">
              <section className="rounded-3xl border border-[#FEE2E2] bg-[#FFFFFF] p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEE2E2] font-black text-[#DC2626]">1</span><div><h2 className="text-xl font-black text-[#111827]" style={{ fontFamily: headingFontStack }}>Upload your CV</h2><p className="mt-1 text-sm text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>Add a CV if you want to make this sample feel more personal.</p></div></div>
                <label className="mt-5 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#FEE2E2] bg-[#F9FAFB] px-6 text-center transition hover:border-[#DC2626]">
                  <Upload className="h-8 w-8 text-[#DC2626]" />
                  <span className="mt-3 text-sm font-extrabold text-[#111827]">{fitCvName || 'Drag and drop your CV here'}</span>
                  <span className="mt-1 text-xs text-[#1F2937]">or click to choose a PDF or DOCX file</span>
                  <input type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(event) => setFitCvName(event.target.files?.[0]?.name || '')} />
                </label>
              </section>

              <section className="rounded-3xl border border-[#FEE2E2] bg-[#FFFFFF] p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEE2E2] font-black text-[#DC2626]">2</span><div><h2 className="text-xl font-black text-[#111827]" style={{ fontFamily: headingFontStack }}>Tell us what you prefer</h2><p className="mt-1 text-sm text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>Choose one answer for each sample question, then submit for feedback.</p></div></div>
                <div className="mt-6 space-y-6">
                  {questions.map((question, questionIndex) => (
                    <fieldset key={question.question}>
                      <legend className="text-sm font-extrabold text-[#111827]">{questionIndex + 1}. {question.question}</legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {question.options.map((option, optionIndex) => {
                          const selected = fitAnswers[questionIndex] === optionIndex;
                          return <button key={option} type="button" onClick={() => { setFitAnswers((current) => ({ ...current, [questionIndex]: optionIndex })); setFitSubmitted(false); }} className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${selected ? 'border-[#DC2626] bg-[#FEE2E2] text-[#DC2626]' : 'border-[#FEE2E2] bg-[#FFFFFF] text-[#1F2937] hover:border-[#DC2626]'}`}>{option}</button>;
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>
                <button type="button" onClick={submitFit} disabled={!fitComplete} className="mt-7 w-full rounded-xl bg-[#DC2626] px-5 py-3 text-sm font-extrabold text-[#FFFFFF] transition enabled:hover:bg-[#B91C1C] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">Submit assessment</button>
              </section>

              {fitSubmitted && <section id="fit-trial-result" className="scroll-mt-24 rounded-3xl border border-[#DC2626] bg-[#FFFFFF] p-5 shadow-sm sm:p-7" style={{ animation: 'trialFeedbackIn 280ms ease-out both' }} aria-live="polite">
                <div className="flex items-start gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#166534]"><CheckCircle2 className="h-5 w-5" /></span><div><h2 className="text-xl font-black text-[#111827]" style={{ fontFamily: headingFontStack }}>Your sample direction</h2><p className="mt-1 text-sm text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>Your preferences point toward a focused starting direction.</p></div></div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#FEF2F2] p-5"><p className="text-xs font-black uppercase tracking-wider text-[#DC2626]" style={{ fontFamily: bodyFontStack }}>Industry fit</p><p className="mt-2 text-xl font-black text-[#111827]" style={{ fontFamily: bodyFontStack }}>{fitProfile.industry}</p></div>
                  <div className="rounded-2xl bg-[#FEF2F2] p-5"><p className="text-xs font-black uppercase tracking-wider text-[#DC2626]" style={{ fontFamily: bodyFontStack }}>Function fit</p><p className="mt-2 text-xl font-black text-[#111827]" style={{ fontFamily: bodyFontStack }}>{fitProfile.function}</p></div>
                  <div className="rounded-2xl border border-[#FEE2E2] p-5 sm:col-span-2"><p className="text-xs font-black uppercase tracking-wider text-[#DC2626]" style={{ fontFamily: bodyFontStack }}>Suggested programs</p><p className="mt-2 font-bold leading-6 text-[#111827]" style={{ fontFamily: bodyFontStack }}>{fitProfile.programs}</p></div>
                </div>
                <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-[#FEF2F2] p-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm font-bold text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>Create a free account for your full fit report and personalized roadmap.</p>{signupButton('Get my full report')}</div>
              </section>}
            </div>
          </div>
        </main>
        <PricingConversion />
        <TrialFooter />
      </>
    );
  };

  const CaseDrill = () => (
    <>
      <main className="bg-[#F9FAFB] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold"><span className="rounded-full bg-[#FEE2E2] px-3 py-1 text-[#DC2626]">Retail</span><span className="rounded-full bg-[#FEE2E2] px-3 py-1 text-[#DC2626]">Profitability</span><span className="inline-flex items-center gap-1 rounded-full border border-[#FEE2E2] bg-[#FFFFFF] px-3 py-1 text-[#1F2937]"><Clock3 className="h-3.5 w-3.5" /> 35 minutes</span></div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-[#111827] sm:text-5xl" style={{ fontFamily: headingFontStack }}>UrbanCart’s profitability challenge</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>UrbanCart is a regional convenience retailer with 120 stores. Revenue grew 14% last year, but operating profit fell by 8%. The CEO wants to understand the decline and identify practical actions for the next twelve months.</p>

          <section className="mt-8 rounded-3xl border border-[#FEE2E2] bg-[#FFFFFF] p-5 shadow-sm sm:p-8">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DC2626] font-black text-[#FFFFFF]">1</span><div><p className="text-xs font-black uppercase tracking-wider text-[#DC2626]" style={{ fontFamily: bodyFontStack }}>First question</p><h2 className="mt-1 text-xl font-black text-[#111827]" style={{ fontFamily: headingFontStack }}>How would you structure the profitability problem?</h2></div></div>
            <p className="mt-5 text-sm leading-6 text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>Take two minutes to outline the main revenue and cost drivers you would investigate. Consider both the store network and customer behavior.</p>
            <textarea value={drillAnswer} onChange={(event) => setDrillAnswer(event.target.value)} aria-label="Your case structure" placeholder="Write your structure here…" className="mt-5 min-h-32 w-full resize-y rounded-2xl border border-[#FEE2E2] bg-[#F9FAFB] p-4 text-sm text-[#111827] outline-none placeholder:text-[#6B7280] focus:border-[#DC2626]" />
            <button type="button" onClick={() => { setDrillGrade(gradeAnswer(drillAnswer)); scrollToTrialResult('drill-trial-result'); }} className="mt-4 rounded-xl bg-[#DC2626] px-5 py-3 text-sm font-extrabold text-[#FFFFFF] transition hover:bg-[#B91C1C]">Submit answer</button>
            {drillGrade && <GradeFeedback grade={drillGrade} mode="drill" resultId="drill-trial-result" />}
          </section>

          <section className="mt-6 overflow-hidden rounded-3xl border border-[#FEE2E2] bg-[#FFFFFF] shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#FEE2E2] p-5 sm:p-6"><Table2 className="h-5 w-5 text-[#DC2626]" /><div><h2 className="font-black text-[#111827]" style={{ fontFamily: headingFontStack }}>Supporting data</h2><p className="text-xs text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>UrbanCart performance by store format</p></div></div>
            <div className="overflow-x-auto p-5 sm:p-6"><table className="w-full min-w-[34rem] text-left text-sm"><thead><tr className="border-b border-[#FEE2E2] text-[#1F2937]"><th className="pb-3 font-black">Format</th><th className="pb-3 font-black">Stores</th><th className="pb-3 font-black">Revenue growth</th><th className="pb-3 font-black">Operating margin</th></tr></thead><tbody><tr className="border-b border-[#FEE2E2] text-[#111827]"><td className="py-4 font-bold">City center</td><td className="py-4">46</td><td className="py-4">+18%</td><td className="py-4">9.2%</td></tr><tr className="blur-[5px]"><td className="py-4">Neighborhood</td><td>51</td><td>+11%</td><td>4.1%</td></tr><tr className="blur-[5px]"><td className="py-4">Transit</td><td>23</td><td>+7%</td><td>2.6%</td></tr></tbody></table></div>
            <div className="border-t border-[#FEE2E2] bg-[#F9FAFB] p-5 text-center">{signupButton('Sign up to access full case drill')}</div>
          </section>
        </div>
      </main>
      <PricingConversion />
      <TrialFooter />
    </>
  );

  const CasePool = () => {
    const selectedAnswer = lockedCase ? poolAnswers[lockedCase.title] || '' : '';
    const selectedGrade = lockedCase ? poolGrades[lockedCase.title] : undefined;
    return (
      <>
        <main className="min-h-[70vh] bg-[#F9FAFB] px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl"><span className="inline-flex rounded-full bg-[#FEE2E2] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[#DC2626]">Practice library</span><h1 className="mt-4 text-3xl font-black tracking-tight text-[#111827] sm:text-5xl" style={{ fontFamily: headingFontStack }}>Choose a case. Test your thinking.</h1><p className="mt-4 text-base leading-7 text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>Preview Casemate’s case library across industries, formats, and difficulty levels.</p></div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TRIAL_CASES.map((trialCase, index) => <button key={trialCase.title} type="button" onClick={() => setLockedCase(trialCase)} className="group rounded-3xl border border-[#FEE2E2] bg-[#FFFFFF] p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#DC2626]"><div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEE2E2] text-sm font-black text-[#DC2626]">0{index + 1}</span><ArrowRight className="h-4 w-4 text-[#DC2626] transition-transform group-hover:translate-x-1" /></div><h2 className="mt-5 text-lg font-black text-[#111827]" style={{ fontFamily: headingFontStack }}>{trialCase.title}</h2><div className="mt-5 flex flex-wrap gap-2 text-[11px] font-extrabold"><span className="rounded-full bg-[#FEE2E2] px-2.5 py-1 text-[#DC2626]">{trialCase.industry}</span><span className="rounded-full border border-[#FEE2E2] px-2.5 py-1 text-[#1F2937]">{trialCase.difficulty}</span><span className="inline-flex items-center gap-1 rounded-full border border-[#FEE2E2] px-2.5 py-1 text-[#1F2937]"><Clock3 className="h-3 w-3" />{trialCase.time}</span></div></button>)}
            </div>
          </div>
        </main>
        <PricingConversion />
        <TrialFooter />
        {lockedCase && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1F2937]/80 p-4" role="dialog" aria-modal="true" aria-labelledby="pool-case-title" onClick={(event) => { if (event.target === event.currentTarget) setLockedCase(null); }}><div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#FEE2E2] bg-[#FFFFFF] p-6 shadow-2xl sm:p-8"><button type="button" onClick={() => setLockedCase(null)} className="absolute right-4 top-4 rounded-full border border-[#FEE2E2] p-2 text-[#111827]" aria-label="Close case preview"><X className="h-4 w-4" /></button><span className="inline-flex rounded-full bg-[#FEE2E2] px-3 py-1 text-xs font-extrabold text-[#DC2626]">{lockedCase.industry} · {lockedCase.difficulty}</span><h2 id="pool-case-title" className="mt-4 pr-10 text-2xl font-black text-[#111827]" style={{ fontFamily: headingFontStack }}>{lockedCase.title}</h2><p className="mt-4 text-sm leading-6 text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>Your client is evaluating an urgent strategic decision. Identify the key drivers, explain how you would test them, and recommend the first action the client should take.</p><textarea value={selectedAnswer} onChange={(event) => setPoolAnswers((current) => ({ ...current, [lockedCase.title]: event.target.value }))} aria-label={`Your answer for ${lockedCase.title}`} placeholder="Write your answer here…" className="mt-5 min-h-32 w-full resize-y rounded-2xl border border-[#FEE2E2] bg-[#F9FAFB] p-4 text-sm text-[#111827] outline-none placeholder:text-[#6B7280] focus:border-[#DC2626]" /><button type="button" onClick={() => { setPoolGrades((current) => ({ ...current, [lockedCase.title]: gradeAnswer(selectedAnswer) })); scrollToTrialResult('pool-trial-result'); }} className="mt-4 rounded-xl bg-[#DC2626] px-5 py-3 text-sm font-extrabold text-[#FFFFFF] transition hover:bg-[#B91C1C]">Submit</button>{selectedGrade && <GradeFeedback grade={selectedGrade} mode="pool" resultId="pool-trial-result" />}</div></div>}
      </>
    );
  };

  const AptitudeTest = () => (
    <>
      <main className="bg-[#F9FAFB] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl"><div className="max-w-3xl"><span className="inline-flex rounded-full bg-[#FEE2E2] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[#DC2626]">3-question sample</span><h1 className="mt-4 text-3xl font-black tracking-tight text-[#111827] sm:text-5xl" style={{ fontFamily: headingFontStack }}>Put your reasoning to the test.</h1><p className="mt-4 text-base leading-7 text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>Choose all three answers, then submit to receive your score and feedback.</p></div>
          <div className="mt-10 space-y-5">
            {APTITUDE_QUESTIONS.map((question, questionIndex) => { const selected = aptitudeAnswers[questionIndex]; const answered = selected !== undefined; const correct = selected === question.correct; return <section key={question.question} className="rounded-3xl border border-[#FEE2E2] bg-[#FFFFFF] p-5 shadow-sm sm:p-7"><div className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FEE2E2] font-black text-[#DC2626]">{questionIndex + 1}</span><div className="min-w-0 flex-1"><h2 className="font-black leading-6 text-[#111827]" style={{ fontFamily: headingFontStack }}>{question.question}</h2><div className="mt-4 grid gap-2 sm:grid-cols-2">{question.answers.map((answer, answerIndex) => <button key={answer} type="button" onClick={() => { setAptitudeAnswers((current) => ({ ...current, [questionIndex]: answerIndex })); setAptitudeSubmitted(false); }} className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${selected === answerIndex ? 'border-[#DC2626] bg-[#FEE2E2] text-[#DC2626]' : 'border-[#FEE2E2] bg-[#FFFFFF] text-[#1F2937] hover:border-[#DC2626]'}`}>{answer}</button>)}</div>{aptitudeSubmitted && answered && <p className={`mt-4 flex items-center gap-2 text-sm font-black ${correct ? 'text-[#166534]' : 'text-[#DC2626]'}`} style={{ fontFamily: bodyFontStack }}>{correct ? <CheckCircle2 className="h-4 w-4" /> : <X className="h-4 w-4" />}{correct ? 'Correct — strong reasoning.' : `Incorrect — the answer is ${question.answers[question.correct]}.`}</p>}</div></div></section>; })}
          </div>
          <button type="button" disabled={!aptitudeComplete} onClick={() => { setAptitudeSubmitted(true); scrollToTrialResult('aptitude-trial-result'); }} className="mt-6 rounded-xl bg-[#DC2626] px-5 py-3 text-sm font-extrabold text-[#FFFFFF] transition enabled:hover:bg-[#B91C1C] disabled:cursor-not-allowed disabled:opacity-40">Submit sample test</button>
          {aptitudeSubmitted && aptitudeComplete && <section id="aptitude-trial-result" className="mt-6 scroll-mt-24 rounded-3xl border border-[#DC2626] bg-[#FFFFFF] p-6 text-center shadow-sm sm:p-8" style={{ animation: 'trialFeedbackIn 280ms ease-out both' }} aria-live="polite"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#DC2626]" style={{ fontFamily: bodyFontStack }}>Sample complete</p><p className="mt-2 text-5xl font-black text-[#111827]" style={{ fontFamily: bodyFontStack }}>{score}/3</p><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#1F2937]" style={{ fontFamily: bodyFontStack }}>{score === 3 ? 'Excellent accuracy. Your next step is building speed across a larger question bank.' : score >= 2 ? 'Good foundation. Review the explanation for the missed question, then practice under time pressure.' : 'This is a useful baseline. Focus on one reasoning type at a time before adding time pressure.'}</p><div className="mt-6">{signupButton('Continue to the full test bank')}</div></section>}
        </div>
      </main>
      <PricingConversion />
      <TrialFooter />
    </>
  );

  const CaseMastery = () => (
    <>
      <main className="bg-[#FFFFFF]">
        <section className="border-b border-[#FEE2E2] bg-[#F9FAFB] px-4 py-14 sm:px-6 sm:py-20"><div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]"><div><span className="inline-flex items-center gap-2 rounded-full bg-[#FEE2E2] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[#DC2626]"><Trophy className="h-4 w-4" /> Casemate competition</span><h1 className="mt-5 text-4xl font-black tracking-tight text-[#111827] sm:text-6xl">Case Arena</h1><p className="mt-3 text-xl font-extrabold text-[#DC2626]">Think clearly. Compete confidently. Rise together.</p><p className="mt-5 max-w-2xl text-base leading-7 text-[#1F2937]">Join a structured live case session, collaborate with an assigned team, and receive a transparent performance score across analysis, communication, and recommendation quality.</p></div><div className="rounded-3xl border border-[#FEE2E2] bg-[#FFFFFF] p-6 shadow-sm"><div className="flex items-center gap-3"><CalendarClock className="h-6 w-6 text-[#DC2626]" /><div><p className="text-xs font-black uppercase tracking-wider text-[#DC2626]">Session status</p><h2 className="mt-1 text-2xl font-black text-[#111827]">Next session: TBA</h2></div></div><p className="mt-4 text-sm leading-6 text-[#1F2937]">Register your interest and be first to know when the next competition opens.</p><button type="button" onClick={onSignUp} className="mt-6 w-full rounded-xl bg-[#DC2626] px-5 py-3 text-sm font-extrabold text-[#FFFFFF]">Register for Case Arena</button></div></div></section>
        <section className="px-4 py-14 sm:px-6 sm:py-20"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#DC2626]">How it works</p><h2 className="mt-3 text-3xl font-black text-[#111827]">From registration to the leaderboard</h2></div><div className="mt-10 grid gap-4 md:grid-cols-3">{[{ icon: FileText, step: '01', title: 'Register', text: 'Create your profile and confirm your availability.' }, { icon: Users, step: '02', title: 'Get Assigned', text: 'Meet your team and receive the live case brief.' }, { icon: Trophy, step: '03', title: 'Compete & Score', text: 'Present your recommendation and receive your score.' }].map((item) => { const ItemIcon = item.icon; return <article key={item.step} className="rounded-3xl border border-[#FEE2E2] bg-[#F9FAFB] p-6"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DC2626] text-[#FFFFFF]"><ItemIcon className="h-5 w-5" /></span><span className="text-sm font-black text-[#DC2626]">{item.step}</span></div><h3 className="mt-5 text-xl font-black text-[#111827]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#1F2937]">{item.text}</p></article>; })}</div></div></section>
        <section className="bg-[#F9FAFB] px-4 py-14 sm:px-6 sm:py-20"><div className="mx-auto max-w-4xl"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#DC2626]">Sample leaderboard</p><h2 className="mt-2 text-3xl font-black text-[#111827]">Top teams</h2></div><Trophy className="h-8 w-8 text-[#DC2626]" /></div><div className="mt-7 overflow-hidden rounded-3xl border border-[#FEE2E2] bg-[#FFFFFF] shadow-sm">{[{ team: 'North Star', score: '92.4' }, { team: 'Red Thread', score: '88.7' }, { team: 'Market Makers', score: '84.9' }].map((row, index) => <div key={row.team} className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-[#FEE2E2] px-5 py-4 last:border-0"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FEE2E2] text-sm font-black text-[#DC2626]">{index + 1}</span><div><p className="font-black text-[#111827]">{row.team}</p><p className="text-xs text-[#1F2937]">Sample team</p></div><span className="text-xl font-black text-[#DC2626]">{row.score}</span></div>)}</div></div></section>
      </main>
      <TrialFooter />
    </>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]" style={{ fontFamily: bodyFontStack }}>
      <style>{`@keyframes trialFeedbackIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <TrialHeader />
      {page === 'fit-assessment' && <FitAssessment />}
      {page === 'case-drill' && <CaseDrill />}
      {page === 'case-pool' && <CasePool />}
      {page === 'aptitude-test' && <AptitudeTest />}
      {page === 'case-arena' && <CaseMastery />}
    </div>
  );
}
function publicPageFromLocation(): PublicLandingPage {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const pathMatch = Object.entries(PUBLIC_PAGE_SEO).find(([key, value]) => !['privacy', 'terms', 'acceptable-use'].includes(key) && value.path === path)?.[0];
  if (pathMatch) return pathMatch as PublicLandingPage;
  const hash = window.location.hash.replace(/^#/, '');
  return hash === 'fit-assessment' || hash === 'practice-tool' ? hash : 'landing';
}

if (typeof document !== 'undefined') {
  applyCasemateFavicons();
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
  // Paint the public landing immediately. Session discovery runs in the
  // background and promotes a valid returning session when it resolves.
  const [step, setStep] = useState<GateStep>('email');
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loginOpen, setLoginOpen] = useState(() => new URLSearchParams(window.location.search).get('login') === '1');
  const [navOverLight, setNavOverLight] = useState(false);
  const [currentPage, setCurrentPage] = useState<PublicLandingPage>(() => publicPageFromLocation());
  const [infoPage, setInfoPage] = useState<'about' | 'contact' | 'privacy' | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvDragOver, setCvDragOver] = useState(false);
  const [deferredStage, setDeferredStage] = useState(0);

  // Email OTP and social authentication state.
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | 'linkedin' | null>(null);
  const socialCallbackStartedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let idleHandle: number | undefined;
    let timerHandle: number | undefined;
    const requestIdle = typeof (window as any).requestIdleCallback === 'function'
      ? (window as any).requestIdleCallback.bind(window) as (callback: () => void, options: { timeout: number }) => number
      : undefined;
    const cancelIdle = typeof (window as any).cancelIdleCallback === 'function'
      ? (window as any).cancelIdleCallback.bind(window) as (handle: number) => void
      : undefined;
    const scheduleStage = (stage: 1 | 2 | 3) => {
      const reveal = () => {
        if (cancelled) return;
        setDeferredStage(stage);
        if (stage === 1) scheduleStage(2);
        else if (stage === 2) scheduleStage(3);
      };
      if (requestIdle) idleHandle = requestIdle(reveal, { timeout: 900 });
      else timerHandle = window.setTimeout(reveal, 250);
    };
    scheduleStage(1);
    return () => {
      cancelled = true;
      if (idleHandle !== undefined) cancelIdle?.(idleHandle);
      if (timerHandle !== undefined) window.clearTimeout(timerHandle);
    };
  }, []);

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
    const url = new URL(window.location.href);
    if (url.searchParams.get('login') !== '1') return;
    url.searchParams.delete('login');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    applyPublicSeo(currentPage);
    applyCasemateFavicons();
    return () => {
      document.title = previousTitle;
    };
  }, [currentPage]);

  useEffect(() => {
    storeAttribution();
    // Public marketing pages do not need session discovery before first paint.
    // Keep the existing authentication check for the landing/sign-in route,
    // while allowing crawlable public routes to render immediately.
    if (publicPageFromLocation() !== 'landing') {
      setStep('email');
      return;
    }
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

  // Real paths are crawlable; the old hash URLs remain working fallbacks.
  useEffect(() => {
    const syncPublicRoute = () => setCurrentPage(publicPageFromLocation());
    syncPublicRoute();
    window.addEventListener('popstate', syncPublicRoute);
    window.addEventListener('hashchange', syncPublicRoute);
    return () => {
      window.removeEventListener('popstate', syncPublicRoute);
      window.removeEventListener('hashchange', syncPublicRoute);
    };
  }, []);

  // Adaptive floating header: sample the surface directly beneath the bar so
  // restored positions, anchor jumps, and every light section get the readable
  // light-nav treatment. The landing page scrolls inside `.eg-root`, and the
  // effect must reattach whenever navigation recreates that container.
  useEffect(() => {
    const root = document.querySelector('.eg-root') as HTMLElement | null;
    if (!root || currentPage !== 'landing') return;
    const sync = () => {
      const rootRect = root.getBoundingClientRect();
      const sampleX = rootRect.left + rootRect.width / 2;
      const sampleY = rootRect.top + 40;
      const darkSurfaceUnderNav = document
        .elementsFromPoint(sampleX, sampleY)
        .some((element) => !!element.closest('#hero, footer'));
      setNavOverLight(!darkSurfaceUnderNav);
    };
    root.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
    return () => {
      root.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [step, currentPage]);

  const checkExistingSession = async () => {
    // `?as=visitor` preview must never adopt either local storage or the
    // platform’s HttpOnly session cookie.
    const forceVisitor = typeof window !== 'undefined' && (window as any).__AUDOS_FORCE_VISITOR__ === true;
    const sessionKey = `space_session_${spaceId}`;
    const existingSession = forceVisitor ? null : localStorage.getItem(sessionKey);
    let storedSession: Record<string, any> | null = null;
    let storedSessionId: string | null = null;
    let storedEmail: string | null = null;

    if (existingSession) {
      try {
        const parsed = JSON.parse(existingSession);
        if (parsed && typeof parsed === 'object') {
          storedSession = parsed;
          const candidateId = parsed.workspaceSessionId || parsed.id;
          storedSessionId = typeof candidateId === 'string' && candidateId ? candidateId : null;
          storedEmail = typeof parsed.email === 'string' && parsed.email.includes('@')
            ? parsed.email.toLowerCase().trim()
            : null;
        }
      } catch (e) {
        console.error('Failed to parse session:', e);
      }
    }

    if (workspaceId && !forceVisitor) {
      try {
        const configRes = await fetch(`/api/auth/otp/space/config/${workspaceId}`);
        const configData = await configRes.json();
        const otpConfig = configData.config || configData;
        setOtpEnabled(otpConfig.enabled || false);
      } catch (e) {
        setOtpEnabled(false);
      }

      const checkPlatformSession = async (sessionUuid?: string | null) => {
        const query = new URLSearchParams({ workspaceId, spaceId });
        if (sessionUuid) query.set('sessionUuid', sessionUuid);
        const response = await fetch(`/api/auth/otp/space/check-session?${query.toString()}`, {
          credentials: 'include',
          cache: 'no-store',
        });
        if (!response.ok) return null;
        return response.json().catch(() => null);
      };

      const adoptPlatformSession = (result: any, fallbackId?: string | null) => {
        const accepted = result?.verified === true
          || (result?.authorized === true && result?.identityMode === 'legacy_registration');
        const canonicalId = typeof result?.canonicalSessionId === 'string' && result.canonicalSessionId
          ? result.canonicalSessionId
          : typeof result?.workspaceSessionId === 'string' && result.workspaceSessionId
            ? result.workspaceSessionId
            : accepted ? fallbackId || null : null;
        if (!accepted || !canonicalId) return false;

        const restoredEmail = typeof result?.email === 'string' && result.email.includes('@')
          ? result.email.toLowerCase().trim()
          : storedEmail;
        const restoredSession = {
          ...(storedSession || {}),
          id: canonicalId,
          workspaceSessionId: canonicalId,
          workspaceId,
          email: restoredEmail,
          timestamp: Date.now(),
          verified: result?.verified === true,
          authorized: result?.authorized === true,
          identityMode: result?.identityMode || (result?.verified === true ? 'strict_verified' : undefined),
        };
        localStorage.setItem(sessionKey, JSON.stringify(restoredSession));
        try {
          window.dispatchEvent(new CustomEvent('audos:session-established', {
            detail: { workspaceSessionId: canonicalId, email: restoredEmail },
          }));
        } catch (e) {}
        if (restoredEmail) setEmail(restoredEmail);
        prefetchEntitlement(canonicalId);
        setSessionId(canonicalId);
        setStep('complete');
        return true;
      };

      try {
        // First validate the exact locally stored session. If it was produced
        // by the old custom Google flow, it will be rejected instead of being
        // trusted merely because page JavaScript marked it `verified`.
        if (storedSessionId) {
          const exact = await checkPlatformSession(storedSessionId);
          if (adoptPlatformSession(exact, storedSessionId)) return;
        }

        // Google OAuth and Safari/iOS cold starts can return with only the
        // platform’s HttpOnly cookie. Ask the platform to resolve that cookie
        // and adopt the canonical wses_ session it returns.
        const restored = await checkPlatformSession();
        if (adoptPlatformSession(restored)) return;
      } catch (e) {
        console.log('[EmailGate] Session verification failed; showing sign-in');
      }

      if (storedEmail) setEmail(storedEmail);
      try { localStorage.removeItem(sessionKey); } catch (e) {}
      setStep('email');
      return;
    }

    // Template previews have no workspace session service. Preserve their
    // local guest behavior, but never use this fallback for a real workspace.
    if (storedSessionId) {
      setSessionId(storedSessionId);
      setStep('complete');
      return;
    }

    setStep('email');
  };

  const handleEmailSubmit = async (e: React.FormEvent, submittedEmail = email) => {
    e.preventDefault();

    // Format validation at the front door: a malformed email must never
    // reach /register (the CRM/lead capture) or trigger an OTP send. The
    // user retries inline; the OTP step remains the real deliverability
    // check for well-formed addresses.
    if (!isValidEmailFormat(submittedEmail)) {
      setError(INVALID_EMAIL_MESSAGE);
      return;
    }

    setEmail(submittedEmail);
    setError('');
    setLoading(true);

    try {
      const normalizedEmail = submittedEmail.toLowerCase().trim();

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

          if (wsSessionId) prefetchEntitlement(wsSessionId);
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
        await registerSession(submittedEmail);
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
    prefetchEntitlement(pendingSessionId!);

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

  const registerSession = async (emailValue = email) => {
    const normalizedEmail = emailValue.toLowerCase().trim();

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
    // Preserve the exact app pathname. On the shared audos.com host, returning
    // to the origin root is outside the workspace route and is rejected as an
    // unsafe return URL; custom domains can legitimately use `/`.
    let socialReturnTo = window.location.href;
    try {
      const returnTarget = new URL(window.location.href);
      returnTarget.searchParams.delete('as');
      returnTarget.hash = 'fit-assessment';
      socialReturnTo = returnTarget.toString();
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
  const adoptAuthSession = async (
    wsSessionId: string,
    emailValue: string | null,
    method: 'google' | 'facebook' | 'linkedin',
    extra: {
      displayName?: string | null;
      avatarUrl?: string | null;
      isReturningUser?: boolean;
    } = {},
  ) => {
    // The auth hook calls /register server-to-server, so its Set-Cookie header
    // cannot reach this browser. Touch the same idempotent registration from
    // here before entering the app; this establishes the real browser session
    // and starts the seven-day sliding lifetime for every OAuth provider.
    const { renewWorkspaceSession, persistWorkspaceSessionCookie } = await import('../lib/authAccount');
    const renewed = emailValue
      ? await renewWorkspaceSession(spaceId, wsSessionId, emailValue).catch(() => null)
      : null;
    const effectiveSessionId = renewed?.workspaceSessionId || wsSessionId;
    const expiresAt = renewed?.expiresAt
      || Date.now() + WORKSPACE_SESSION_MAX_AGE_SECONDS * 1000;
    persistWorkspaceSessionCookie(effectiveSessionId);

    const sessionKey = `space_session_${spaceId}`;
    const session = {
      id: effectiveSessionId,
      workspaceSessionId: effectiveSessionId,
      email: emailValue,
      displayName: extra.displayName || null,
      avatarUrl: extra.avatarUrl || null,
      timestamp: Date.now(),
      lastRefreshedAt: Date.now(),
      expiresAt,
      verified: true,
      authMethod: method,
      isReturningUser: !!extra.isReturningUser,
      metadata: {
        displayName: extra.displayName || null,
        avatarUrl: extra.avatarUrl || null,
      },
    };
    localStorage.setItem(sessionKey, JSON.stringify(session));
    prefetchEntitlement(effectiveSessionId);
    try {
      window.dispatchEvent(new CustomEvent('audos:session-established', {
        detail: { workspaceSessionId: effectiveSessionId, email: emailValue, authMethod: method },
      }));
    } catch (e) {}
    if (emailValue) {
      if (typeof (window as any).fbq === 'function' && (window as any).__META_PIXEL_ID__) {
        (window as any).fbq('init', (window as any).__META_PIXEL_ID__, { em: emailValue });
      }
      fireLeadEventWithRetry(emailValue);
    }
    setSessionId(effectiveSessionId);
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
    setLoginOpen(true);
    setError('');
    setSocialLoading(provider);

    void import('../lib/authAccount')
      .then(({ completeSocialOAuthCallback }) => completeSocialOAuthCallback(provider))
      .then(async ({ result, returnTo }) => {
        let safeReturnTo = '/';
        try {
          const parsed = new URL(returnTo, window.location.origin);
          if (parsed.origin === window.location.origin) {
            safeReturnTo = parsed.pathname + parsed.search + parsed.hash;
          }
        } catch (e) {}
        const oauthSucceeded = result.success && !!result.workspaceSessionId;
        const restartRequired = result.restartRequired === true || result.code === 'oauth_restart_required';
        window.history.replaceState(
          {},
          '',
          oauthSucceeded ? SOCIAL_OAUTH_SUCCESS_PATH : restartRequired ? '/' : safeReturnTo,
        );
        if (oauthSucceeded && result.workspaceSessionId) {
          await adoptAuthSession(result.workspaceSessionId, result.email || null, provider, {
            displayName: result.displayName || null,
            avatarUrl: result.avatarUrl || null,
            isReturningUser: !!result.isReturningUser,
          });
          return;
        }
        if (restartRequired) {
          // Keep the already-open login modal interactive instead of leaving
          // the visitor on a callback error screen with no recovery path.
          setError('Please start sign-in again.');
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
    setError('');
    setSocialLoading(provider);
    try {
      const {
        beginSocialOAuth,
        isFacebookLoginConfigured,
        isGoogleLoginConfigured,
        isLinkedInLoginConfigured,
      } = await import('../lib/authAccount');
      const configured = provider === 'google'
        ? isGoogleLoginConfigured()
        : provider === 'facebook'
          ? isFacebookLoginConfigured()
          : isLinkedInLoginConfigured();
      if (!configured) {
        const label = provider === 'google' ? 'Google' : provider === 'facebook' ? 'Facebook' : 'LinkedIn';
        setError(`${label} sign-in is not activated yet. Please use email for now.`);
        setSocialLoading(null);
        return;
      }
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
  const heroImageSourceUrl =
    'https://storage.googleapis.com/audos-images/generated-images/agent/workspace-539150/img-1789529370697-nsmyb9.png';
  const heroImageUrl =
    `https://res.cloudinary.com/asfzhhej/image/fetch/f_jpg,q_auto:good,w_1280/${heroImageSourceUrl}`;
  const heroImageCdn = 'https://res.cloudinary.com/asfzhhej/image/fetch/f_webp,q_auto:good';
  const heroImageWebpSrcSet = [640, 960, 1280, 1536]
    .map((width) => `${heroImageCdn},w_${width}/${heroImageSourceUrl} ${width}w`)
    .join(', ');
  // Near-black ink for section headings (consultancy-grade hierarchy): the
  // brand red stays an accent (rules, icons, CTAs) instead of coloring whole
  // headlines.
  const headingInk = normalizeHexColor(palette?.text?.primary) || '#111827';
  const loginPanelId = 'email-gate-login-panel';

  const openLogin = () => {
    setError('');
    setLoginOpen(true);
  };

  // Bain-style top navigation: in-page section links. The landing scrolls
  // inside `.eg-root` (not the window), so scrollIntoView targets the section
  // directly instead of relying on URL-fragment navigation.
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onCanonicalDomain = window.location.hostname === 'www.casemateaud.com' || window.location.hostname === 'casemateaud.com';
  const openProductFeature = (page: LandingFeaturePage) => {
    setCurrentPage(page);
    const browserPath = onCanonicalDomain
      ? PUBLIC_PAGE_SEO[page].path
      : `${window.location.pathname}${window.location.search}#${page}`;
    window.history.pushState({}, '', browserPath);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const openLegalPage = (target: 'terms' | 'acceptable-use' | 'privacy') => {
    if (target === 'privacy') {
      setInfoPage('privacy');
      return;
    }
    const nextUrl = onCanonicalDomain
      ? PUBLIC_PAGE_SEO[target].path
      : `${window.location.pathname}${window.location.search}#${target}`;
    window.history.pushState({}, '', nextUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const openLandingSection = (section?: 'cv-drop' | 'programs-open' | 'pricing') => {
    setCurrentPage('landing');
    const browserPath = onCanonicalDomain ? '/' : `${window.location.pathname}${window.location.search}`;
    window.history.pushState({}, '', browserPath);
    window.setTimeout(() => {
      if (section) scrollToSection(section);
      else document.querySelector('.eg-root')?.scrollTo({ top: 0, behavior: 'auto' });
    }, 0);
  };

  // Adaptive navbar ink. The mark is white over the dark hero and switches to
  // Casemate red over light sections, keeping the landing identity white + red.
  // All nav text uses the same high-contrast brand ink.
  const lightNavInk = primaryColor;
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
            className="w-full px-4 py-4 text-base rounded-2xl focus:outline-none transition-transform"
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
          className="w-full py-4 rounded-2xl font-bold text-base transition-transform flex items-center justify-center gap-2 hover:scale-[1.02]"
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
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold transition-transform hover:-translate-y-0.5"
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
  // Temporarily keep every social provider visible but unavailable. Email OTP
  // remains the only active sign-in path until account/session unification is
  // fully verified end to end.
  const googleConfigured = false;
  const linkedinConfigured = false;
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
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
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
          disabled={!linkedinConfigured || !!socialLoading || loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
          style={socialButtonStyle(linkedinConfigured && !socialLoading && !loading)}
          data-testid="button-linkedin-login"
        >
          {socialLoading === 'linkedin' ? <Loader2 size={18} className="animate-spin" /> : renderLinkedInMark()}
          <span>Continue with LinkedIn</span>
          {!linkedinConfigured && renderComingSoonPill()}
        </button>
      </div>

      {renderDivider('or')}

      {/* 3 — email: the original OTP-only flow (4-digit emailed code, no password) */}
      <EmailLoginForm
        initialEmail={email}
        loading={loading}
        error={error}
        sectionBackground={sectionBackground}
        borderColor={borderColor}
        textPrimary={textPrimary}
        textSubtle={textSubtle}
        dangerColor={dangerColor}
        primaryColor={primaryColor}
        onPrimary={onPrimary}
        onSubmit={handleEmailSubmit}
        onClearError={() => setError('')}
      />

      <AcquisitionSourceQuestion
        textPrimary={textPrimary}
        textMuted={textMuted}
        borderColor={borderColor}
        primaryColor={primaryColor}
        onPrimary={onPrimary}
        sectionBackground={sectionBackground}
        disabled={loading}
      />

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
            <a href="https://www.casemateaud.com/terms" target="_blank" rel="noopener noreferrer" className="font-medium underline" style={{ color: textPrimary }}>
              Terms of Service
            </a>,{' '}
            <a href="https://www.casemateaud.com/acceptable-use" target="_blank" rel="noopener noreferrer" className="font-medium underline" style={{ color: textPrimary }}>
              Acceptable Use Policy
            </a>{' '}and{' '}
            <a href="https://www.casemateaud.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-medium underline" style={{ color: textPrimary }}>
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

      {!gdprEnabled && (
        <p className="mt-4 text-center text-xs leading-5" style={{ color: textMuted }}>
          By signing in, you agree to our{' '}
          <a href="https://www.casemateaud.com/terms" target="_blank" rel="noopener noreferrer" className="font-medium underline" style={{ color: textPrimary }}>Terms of Service</a>,{' '}
          <a href="https://www.casemateaud.com/acceptable-use" target="_blank" rel="noopener noreferrer" className="font-medium underline" style={{ color: textPrimary }}>Acceptable Use Policy</a>{' '}and{' '}
          <a href="https://www.casemateaud.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-medium underline" style={{ color: textPrimary }}>Privacy Policy</a>.
        </p>
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
            Sign in your way and your free fit assessment starts right away.
          </p>
        </div>
      )}

      {renderMainView()}
    </div>
  );

  // Session discovery must not hide the product behind loading copy. Paint
  // existing brand content immediately while authentication resolves.
  if (step === 'loading') {
    return (
      <main className="min-h-screen bg-white px-5 py-16 text-[#111827]" style={{ fontFamily: bodyFontStack }}>
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#e5e7eb] bg-[#f9fafb] p-8 shadow-sm sm:p-12">
          <BrandLogoMark size={42} style={{ color: primaryColor }} />
          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl" style={{ fontFamily: headingFontStack }}>{brandName}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#6b7280]">{tagline}</p>
          <div className="mt-8 h-2 w-40 overflow-hidden rounded-full bg-[#fee2e2]" role="status" aria-label="Preparing secure sign-in">
            <span className="block h-full w-2/3 animate-pulse rounded-full" style={{ backgroundColor: primaryColor }} />
          </div>
        </div>
      </main>
    );
  }
  if (step === 'complete') return <BrandSplash />;

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
              <h1 className="text-lg font-extrabold tracking-tight sm:text-2xl" style={{ color: headingInk, fontFamily: headingFontStack }}>
                Check your inbox
              </h1>
              <p className="mt-2 text-sm" style={{ color: textMuted }}>
                We sent a 4-digit code to<br />
                <span className="font-medium" style={{ color: headingInk }}>{email}</span>
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
                  className="w-full rounded-xl px-4 py-3 text-center font-mono text-xl tracking-[0.35em] transition-transform focus:outline-none sm:text-2xl sm:tracking-[0.5em]"
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
                className="w-full py-3.5 rounded-2xl font-bold text-base transition-transform flex items-center justify-center gap-2 hover:scale-[1.02]"
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
      {currentPage !== 'landing' ? (
        <Suspense fallback={null}>
          <LandingFeaturePages
            page={currentPage}
            onHome={openLandingSection}
            onNavigate={openProductFeature}
            onSignUp={openLogin}
            onOpenLegal={openLegalPage}
            brandName={brandName}
            headingFontStack={headingFontStack}
            bodyFontStack={bodyFontStack}
          />
        </Suspense>
      ) : (
    <div className="eg-root h-screen overflow-x-hidden overflow-y-auto" style={{ height: '100dvh', WebkitOverflowScrolling: 'touch', fontFamily: bodyFontStack, backgroundColor: pageBackground }}>
  <style>{`.eg-root > section:not(#hero), .eg-root > footer { content-visibility: auto; contain-intrinsic-size: auto 800px; }`}</style>
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
    }}
  >
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-5">
      <div className="flex items-center gap-3">
        <BrandLogoMark size={30} style={{ color: navInk }} />
        <span className="max-w-[45vw] truncate text-sm sm:max-w-none sm:text-base" style={{ fontFamily: headingFontStack, color: navInk, fontWeight: 700, letterSpacing: '-0.01em' }}>{brandName}</span>
      </div>
      <div className="ml-auto hidden items-center gap-5 lg:flex" aria-label="Page sections">
        <button type="button" onClick={() => scrollToSection('cv-drop')} className="text-sm hover:opacity-60" style={{ color: navLinkInk, fontWeight: 600, transition: 'opacity 0.2s ease' }}>Try Now</button>
        <button type="button" onClick={() => scrollToSection('programs-open')} className="text-sm hover:opacity-60" style={{ color: navLinkInk, fontWeight: 600, transition: 'opacity 0.2s ease' }}>Programs Open</button>
        <div className="group relative">
          <button type="button" className="flex items-center gap-1.5 text-sm hover:opacity-60" style={{ color: navLinkInk, fontWeight: 600, transition: 'opacity 0.2s ease' }} aria-haspopup="true">Practice Tool <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" /></button>
          <div className="invisible absolute left-1/2 top-full z-[100] w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 pt-7 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 text-[#111827] shadow-2xl">
              <div className="border-b border-[#f1f5f9] pb-4"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#cc0000]">Practice Tool</p><p className="mt-1 text-sm text-[#64748b]">Choose the preparation area you want to work on.</p></div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  { page: 'fit-assessment' as const, href: '/fit-assessment', icon: Target, label: 'Fit Assessment', text: 'Find your best-fit industry, function and program path.' },
                  { page: 'practice-tool' as const, href: '/practice-tool', icon: LineChart, label: 'Case Drill', text: 'Build structure, calculation and problem-solving speed.' },
                  { page: 'domain-knowledge' as const, href: '/domain-knowledge', icon: BookOpen, label: 'Domain Knowledge', text: 'Learn industry models, key terms and commercial context.' },
                  { page: 'aptitude-test' as const, href: '/aptitude-test', icon: GraduationCap, label: 'Aptitude Test', text: 'Practise numerical, logical and verbal screening questions.' },
                ].map((item) => <a key={item.page} href={item.href} onClick={(event) => { event.preventDefault(); openProductFeature(item.page); }} className="group/item flex gap-3 rounded-xl p-4 hover:bg-[#fff5f5]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fee2e2] text-[#cc0000]"><item.icon className="h-5 w-5" /></span><span><span className="block font-extrabold text-[#111827]">{item.label}</span><span className="mt-1 block text-xs leading-5 text-[#64748b]">{item.text}</span></span></a>)}
              </div>
            </div>
          </div>
        </div>
        <a href="/about" onClick={(event) => { event.preventDefault(); openProductFeature('about'); }} className="text-sm hover:opacity-60" style={{ color: navLinkInk, fontWeight: 600, transition: 'opacity 0.2s ease' }}>About Us</a>
        <button type="button" onClick={() => scrollToSection('pricing')} className="text-sm hover:opacity-60" style={{ color: navLinkInk, fontWeight: 600, transition: 'opacity 0.2s ease' }}>Pricing</button>
      </div>
      <details className="group relative ml-auto lg:hidden">
        <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-white/30" style={{ color: navLinkInk }} aria-label="Open navigation menu"><Menu className="h-5 w-5" /></summary>
        <nav className="absolute right-0 top-12 z-[90] w-72 rounded-2xl border border-[#e5e7eb] bg-white p-2 text-[#111827] shadow-2xl" aria-label="Mobile page navigation">
          <button type="button" onClick={() => scrollToSection('cv-drop')} className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold hover:bg-[#fff5f5]">Try Now</button>
          <button type="button" onClick={() => scrollToSection('programs-open')} className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold hover:bg-[#fff5f5]">Programs Open</button>
          <p className="px-3 pb-1 pt-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#cc0000]">Practice Tool</p>
          <a href="/fit-assessment" onClick={(event) => { event.preventDefault(); openProductFeature('fit-assessment'); }} className="block rounded-xl px-3 py-2.5 pl-5 text-sm font-bold hover:bg-[#fff5f5]">Fit Assessment</a>
          <a href="/practice-tool" onClick={(event) => { event.preventDefault(); openProductFeature('practice-tool'); }} className="block rounded-xl px-3 py-2.5 pl-5 text-sm font-bold hover:bg-[#fff5f5]">Case Drill</a>
          <a href="/domain-knowledge" onClick={(event) => { event.preventDefault(); openProductFeature('domain-knowledge'); }} className="block rounded-xl px-3 py-2.5 pl-5 text-sm font-bold hover:bg-[#fff5f5]">Domain Knowledge</a>
          <a href="/aptitude-test" onClick={(event) => { event.preventDefault(); openProductFeature('aptitude-test'); }} className="block rounded-xl px-3 py-2.5 pl-5 text-sm font-bold hover:bg-[#fff5f5]">Aptitude Test</a>
          <div className="my-2 border-t border-[#f1f5f9]" />
          <a href="/about" onClick={(event) => { event.preventDefault(); openProductFeature('about'); }} className="block rounded-xl px-3 py-2.5 text-sm font-bold hover:bg-[#fff5f5]">About Us</a>
          <button type="button" onClick={() => scrollToSection('pricing')} className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold hover:bg-[#fff5f5]">Pricing</button>
        </nav>
      </details>
      <button onClick={openLogin} className="shrink-0 rounded-xl bg-[#cc0000] px-3.5 py-2 text-xs hover:-translate-y-0.5 hover:bg-[#b91c1c] sm:rounded-full sm:px-5 sm:py-2.5 sm:text-sm" style={{ color: '#ffffff', fontWeight: 700, transition: 'transform 0.2s ease' }}>
        Start free
      </button>
    </div>
  </nav>

  <section id="hero" className="relative flex items-center overflow-hidden" style={{ minHeight: '84svh', backgroundColor: '#0f172a' }}>
    <picture className="absolute inset-0 block h-full w-full">
      <source srcSet={heroImageWebpSrcSet} sizes="100vw" type="image/webp" />
      <img
        src={heroImageUrl}
        alt=""
        width={1536}
        height={1024}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="h-full w-full object-cover"
      />
    </picture>
    <div aria-hidden="true" data-audos-hero-scrim="1" className="absolute inset-0" style={{ background: heroScrim, pointerEvents: 'none' }} />
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0) 100%)', pointerEvents: 'none' }} />
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40" style={{ background: 'linear-gradient(180deg, rgba(2,6,23,0) 0%, rgba(2,6,23,0.4) 100%)', pointerEvents: 'none' }} />
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:py-12">
      <div className="max-w-3xl">
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" style={{ width: 44, height: 3, backgroundColor: primaryColor, flexShrink: 0 }} />
            <span className="break-words text-[11px] uppercase leading-snug sm:text-xs" style={{ color: 'rgba(255,255,255,0.88)', letterSpacing: '0.16em', fontWeight: 700 }}>For Vietnamese Economics &amp; STEM students preparing for Graduate, Internship &amp; Rotational Programs</span>
          </div>
          <h1 className="mt-7 text-lg leading-snug sm:mt-8 sm:text-5xl md:text-6xl" style={{ fontFamily: headingFontStack, color: '#ffffff', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05 }}>
            <span className="block text-xl sm:text-3xl md:text-4xl">Start to Be</span>
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
          className="mt-7 flex w-full cursor-pointer flex-col items-center rounded-2xl px-5 py-9 text-center sm:py-11"
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
      <DeferredCompanyLogoGrid />
    </div>
  </section>

  <DeferredLandingLivePrograms onStart={openLogin} />

  {deferredStage >= 1 && (
    <>
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
    </>
  )}

  {deferredStage >= 2 && (
    <>
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
              <button type="button" onClick={openLogin} className="mt-8 w-full rounded-full py-3.5 text-sm font-extrabold transition-transform hover:-translate-y-0.5" style={{ backgroundColor: primaryColor, color: onPrimary }}>Choose this plan</button>
            </article>
          );
        })}
      </div>
    </div>
  </section>
    </>
  )}

  {deferredStage >= 3 && (
    <>
  <footer className="bg-black text-white">
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div><div className="flex items-center gap-3"><BrandMark size={28} blockColor="#ffffff" /><span className="font-extrabold">{brandName}</span></div><p className="mt-3 text-sm text-white/55">Direction first. Prep second.</p></div>
        <nav className="flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold" aria-label="Public pages"><a href="/fit-assessment" onClick={(event) => { event.preventDefault(); openProductFeature('fit-assessment'); }} className="text-white/70 hover:text-white">Fit Assessment</a><a href="/practice-tool" onClick={(event) => { event.preventDefault(); openProductFeature('practice-tool'); }} className="text-white/70 hover:text-white">Case Drill</a><a href="/domain-knowledge" onClick={(event) => { event.preventDefault(); openProductFeature('domain-knowledge'); }} className="text-white/70 hover:text-white">Domain Knowledge</a><a href="/aptitude-test" onClick={(event) => { event.preventDefault(); openProductFeature('aptitude-test'); }} className="text-white/70 hover:text-white">Aptitude Test</a><a href="/about" onClick={(event) => { event.preventDefault(); openProductFeature('about'); }} className="text-white/70 hover:text-white">About Us</a><button type="button" onClick={() => setInfoPage('contact')} className="text-white/70 hover:text-white">Contact Us</button><button type="button" onClick={() => setInfoPage('privacy')} className="text-white/70 hover:text-white">Privacy Policy</button><a href="/terms" onClick={(event) => { event.preventDefault(); openLegalPage('terms'); }} className="text-white/70 hover:text-white">Terms of Service</a><a href="/acceptable-use" onClick={(event) => { event.preventDefault(); openLegalPage('acceptable-use'); }} className="text-white/70 hover:text-white">Acceptable Use Policy</a></nav>
        <div className="space-y-4"><a href="mailto:support@casemateaud.com" className="block text-sm font-semibold text-white/70 hover:text-white">support@casemateaud.com</a><DeferredSocialIconLinks /></div>
      </div>
      <p className="mt-12 border-t border-white/15 pt-6 text-xs text-white/40">© 2025 Casemate. All rights reserved.</p>
    </div>
  </footer>
    </>
  )}
</div>
      )}
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
              <p className="mb-4 text-xs leading-snug sm:text-sm" style={{ color: textMuted }}>
                Enter your email and you’ll be talking with Mate in seconds — your free MT &amp; consulting fit assessment starts right away.
              </p>
              {renderLoginPanel(true)}
            </div>
          </div>
        </div>
      )}

      {infoPage && (
        <Suspense fallback={null}>
          <LandingInfoPage page={infoPage} onClose={() => setInfoPage(null)} onNavigate={setInfoPage} onOpenLegal={openLegalPage} />
        </Suspense>
      )}
    </>
  );
}

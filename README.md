# QR Check: PathCheck's Universal Verifier

<img align="right" src="./docs/shc_walkthrough/3.%20Scan%20Results.png" data-canonical-src="./docs/shc_walkthrough/3.%20Scan%20Results.png" width="350px"/>

Universal Verifiable Credentials Verifier app for Android and iOS using PathCheck's SDKs. The app scans a QR code for a credential/pass, cryptographically verifies it and displays the results on the phone. Our goal is to make a Verifier App with the widest possible verification capabilities. 

Join the team on [Matrix/Element](https://matrix.to/#/#pcf-universal-verifier:matrix.org) or [Slack](https://join.slack.com/t/pathcheck/shared_invite/zt-gs0bf4h0-2I92eiVThkNLojL2e_VQvA).

## Download the latest release

- [Apple Store](https://apps.apple.com/us/app/pathcheck-qr-check/id1567077398)
- [Play Store](https://play.google.com/store/apps/details?id=org.pathcheck.universalverifier)
- [APK](https://github.com/vitorpamplona/vaccine-certificate-tracking-app/releases)

## Currently Supported Formats: 

- [x] [CRED](https://github.com/Path-Check/cred-sdk.js): PathCheck's [PaperCreds](https://github.com/Path-Check/paper-cred)
- [x] [DIVOC](https://github.com/Path-Check/divoc-sdk.js): [COWIN's](https://www.cowin.gov.in/) Credentials in India/Sri Lanka
- [x] [SHC](https://github.com/Path-Check/shc-sdk.js): [SmartHealth Cards](https://smarthealth.cards/)'s credentials in the US and Canada
- [x] [HC1](https://github.com/Path-Check/dcc-sdk.js): EU's [Digital Covid Certificates](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en) by the eHealth Network
- [x] Excelsior: [NY's](https://covid19vaccine.health.ny.gov/excelsior-pass) COVID pass
- [x] [VDS](https://github.com/Path-Check/vds-sdk.js): ICAO's [Visible Digital Seals](https://www.icao.int/Security/FAL/TRIP/Documents/TR%20-%20Visible%20Digital%20Seals%20for%20Non-Electronic%20Documents%20V1.31.pdf)
- [ ] [JXT](https://github.com/Path-Check/bbs-jxt-sdk.js): A BBS+ W3C Verifiable Credentials minimized with [JSON-XT](https://jsonxt.io/)
- [ ] [CBLD](https://github.com/Path-Check/bbs-cbld-sdk.js): A CBOR-LD version of W3C Verifiable Credentials. 
- [ ] Good Health Pass

## Currently Supported Issuers: 
- [x] State of California
- [x] State of Louisiana
- [x] State of Massachusetts
- [x] State of New Jersey
- [x] State of New York
- [x] State of Utah
- [x] Province of British Columbia
- [x] Province of Manitoba
- [x] Province of Nova Scotia
- [x] Province of Quebec
- [x] Province of the Northwest Territories
- [x] Province of Yukon
- [x] Government of Albania
- [x] Government of Andorra
- [x] Government of Australia
- [x] Government of Austria
- [x] Government of Barbados
- [x] Government of Belgium
- [x] Government of Bulgaria
- [x] Government of Croatia
- [x] Government of Cyprus
- [x] Government of Czechia
- [x] Government of Denmark
- [x] Government of Estonia
- [x] Government of Finland
- [x] Government of France
- [x] Government of Germany
- [x] Government of Greece
- [x] Government of Hungary
- [x] Government of Iceland
- [x] Government of India
- [x] Government of Ireland
- [x] Government of Israel
- [x] Government of Italy
- [x] Government of Latvia
- [x] Government of Liechtenstein
- [x] Government of Lithuania
- [x] Government of Luxembourg
- [x] Government of Malta
- [x] Government of Monaco
- [x] Government of Morocco
- [x] Government of North Macedonia
- [x] Government of Norway
- [x] Government of Panama
- [x] Government of Philippines
- [x] Government of Poland
- [x] Government of Portugal
- [x] Government of Romania
- [x] Government of San Marino
- [x] Government of Slovakia
- [x] Government of Slovenia
- [x] Government of Spain
- [x] Government of Sri Lanka
- [x] Government of Sweden
- [x] Government of Switzerland
- [x] Government of the Faroe Islands
- [x] Government of the Holy See (Vatican City State)
- [x] Government of the Netherlands
- [x] Government of the United Kingdom
- [x] Government of Turkey
- [x] Government of Ukraine
- [x] Government of Uruguay
- [x] Adventist Health
- [x] Advocate Aurora Health
- [x] Alaska Tribal Health System
- [x] Allegheny Health Network
- [x] AltaMed
- [x] Ascension
- [x] Aspirus
- [x] Asquam Community Health Collaborative
- [x] Atrium Health
- [x] Atrius Health
- [x] Aultman
- [x] Austin Regional Clinic
- [x] Banner Health
- [x] Baptist Health
- [x] Baptist Health South Florida
- [x] Baptist Memorial Health Care
- [x] Barnabas Health
- [x] Baylor Scott & White Health
- [x] Beaumont Health
- [x] Beth Israel Lahey Health
- [x] Billings Clinic
- [x] BioReference Laboratories
- [x] BJC HealthCare and Washington University Physicians
- [x] Blanchard Valley Health System
- [x] Boca Raton Regional Hospital
- [x] Borgess Health Alliance Inc.
- [x] Bronson Healthcare Group
- [x] Broward Health
- [x] Bryan Health
- [x] Cabell Huntington Hospital and Marshall Health
- [x] Capital Health
- [x] Carle Foundation Hospital
- [x] CarolinaEast Medical Center
- [x] Catholic Health System
- [x] Cedars-Sinai Medical Center
- [x] Centra Health
- [x] CentraCare
- [x] Central Maine Healthcare
- [x] Centura Health
- [x] Charleston Area Medical Center
- [x] Children's Hospital Los Angeles
- [x] Children's Mercy Hospital
- [x] Children's National Hospital
- [x] Chinese Hospital
- [x] City of Hope
- [x] Clara Barton Hospital
- [x] Columbia St. Mary's
- [x] Columbus Regional Healthcare System
- [x] Community Health Network
- [x] Community HealthCare System
- [x] Community Medical Centers
- [x] Contra Costa Health Services
- [x] Conway Medical Center
- [x] Cook County Health
- [x] Cottage Health
- [x] Covenant Health
- [x] CoxHealth
- [x] Crittenton Hospital Medical Center
- [x] CVS Health
- [x] Deaconess Health System
- [x] Denver Health
- [x] Detroit Medical Center
- [x] Dignity Health
- [x] Doctors Care
- [x] Doctors Hospital at Renaissance
- [x] DuPage Medical Group and Edward-Elmhurst Health
- [x] East Jefferson General Hospital
- [x] eHealth Saskatchewan
- [x] Einstein Healthcare Network
- [x] Ellis Medicine
- [x] Emory BLUE Patient Portal
- [x] Emory Healthcare GOLD Patient Portal
- [x] Englewood Hospital and Medical Center
- [x] EPIC Management
- [x] Essentia Health
- [x] Express Scripts
- [x] Fairfield Memorial Hospital
- [x] First Choice Community HealthCare
- [x] Fisher-Titus Medical Center
- [x] Franciscan Alliance
- [x] Franciscan Missionaries of Our Lady Health System, Inc.
- [x] Froedtert Health
- [x] Georgia Regents Health System
- [x] Golden Valley Health Centers
- [x] Greater Baltimore Medical Center
- [x] Group Health Cooperative - South Central Wisconsin
- [x] Gundersen Health System
- [x] Hackensack Meridian Health
- [x] Hamilton Health Care System
- [x] Hartford HealthCare
- [x] Hattiesburg Clinic and Forrest Health
- [x] Hawaii Pacific Health
- [x] Health Quest
- [x] Hennepin Healthcare
- [x] Henry Community Health
- [x] Henry Ford Health System
- [x] Holland Hospital
- [x] Hudson Physicians, S.C
- [x] Huntsville Hospital Health System
- [x] Indiana Regional Medical Center
- [x] Johns Hopkins Medicine
- [x] Kaiser Permanente
- [x] Kaleida Health
- [x] Katherine Shaw Bethea Hospital
- [x] Keck Medicine of USC
- [x] Kelsey-Seybold Clinic
- [x] Kennedy Krieger Institute
- [x] Lafayette General Medical Center
- [x] Lakeland Regional Health
- [x] Lawrence Memorial Hospital
- [x] LCMC Health
- [x] Lehigh Valley Health Network
- [x] LifeBridge Health
- [x] LifePoint Health
- [x] Logansport Memorial Hospital
- [x] Los Angeles County Department of Health Services
- [x] Lowell General Hospital
- [x] Magruder Hospital
- [x] MaineHealth
- [x] Marcus Daly Memorial Hospital
- [x] Margaret Mary Health
- [x] Mary Washington Healthcare
- [x] Mass General Brigham
- [x] Maury Regional Health
- [x] Medical Associates Clinic
- [x] MediSys Health Network
- [x] MedStar Health
- [x] Memorial Healthcare System
- [x] Memorial Hermann
- [x] Memorial Hospital
- [x] MemorialCare
- [x] Mercy Medical Center
- [x] Mercyhealth
- [x] Methodist Health System
- [x] Methodist Le Bonheur Healthcare
- [x] Middlesex Health
- [x] Midwest Medical Center
- [x] Mineola District Hospital
- [x] Mission Health
- [x] Missouri Delta Medical Center
- [x] MIT Medical
- [x] Moffitt Cancer Center
- [x] Molina Healthcare
- [x] Monongalia General Hospital
- [x] Monroe Clinic
- [x] Montage Health
- [x] Mt Sinai - FL
- [x] Munson Healthcare
- [x] My Ascension Seton
- [x] My Health Kaweah Health
- [x] My VCU Health
- [x] MyNCH Health Portal
- [x] New York Consortium
- [x] NewYork-Presbyterian Brooklyn Methodist Hospital
- [x] North Kansas City Hospital and Meritas Health
- [x] North Memorial Health
- [x] NorthBay Healthcare
- [x] Northside Hospital
- [x] NYU Langone Health System
- [x] Ochsner Health System
- [x] OhioHealth
- [x] Olathe Health
- [x] One Brooklyn Health System
- [x] OSF HealthCare
- [x] Pagosa Springs Medical Center
- [x] Parkview Health
- [x] PathCheck Foundation
- [x] PeaceHealth
- [x] Pediatric Physicians' Organization at Children's
- [x] Penn Medicine
- [x] Penn State Health St. Joseph
- [x] Phelps Health
- [x] Plumas District Hospital
- [x] Pomona Valley Hospital Medical Center
- [x] Premier Health
- [x] Premise Health
- [x] Presbyterian Healthcare Services
- [x] ProHealth
- [x] Providence St. Joseph Health
- [x] QuadMed
- [x] Regional Medical Center
- [x] Renown Health
- [x] Rite Aid
- [x] Riverside Health System
- [x] Riverside Medical Group
- [x] Roper St. Francis Healthcare
- [x] Rutland Regional Medical Center
- [x] Salem Health
- [x] Samaritan Health Services
- [x] San Antonio Regional Hospital
- [x] San Francisco Department of Public Health
- [x] San Joaquin General Hospital
- [x] San Juan Regional Medical Center
- [x] Sarah Bush Lincoln Health Center
- [x] Scripps Health
- [x] Seattle Children’s
- [x] Silver Cross Hospital
- [x] South Central Regional Medical Center
- [x] South Georgia Medical Center
- [x] South Shore Health
- [x] Southeast Health
- [x] SoutheastHEALTH
- [x] Sparrow Health System
- [x] Spectrum Health
- [x] Spectrum Health Lakeland
- [x] SSM Health
- [x] St. Elizabeth Healthcare
- [x] St. John's Health
- [x] St. Joseph's Health
- [x] St. Luke’s Health System (Idaho)
- [x] Stony Brook Business Ventures, LLC
- [x] Stony Brook Medicine
- [x] Stormont-Vail
- [x] Sturdy Memorial Hospital and Sturdy Memorial Associates
- [x] Surgery Partners - Nashville
- [x] Sutter Health
- [x] Sydney Local Health District
- [x] Tenet Healthcare Corporation
- [x] Tenet HealthSystem Medical Inc.
- [x] Texas Health Resources
- [x] The Guthrie Clinic
- [x] The University of Texas Health Science Center at Houston
- [x] The University of Vermont Medical Center
- [x] Torrance Memorial
- [x] Tower Health
- [x] Trinity Health North Dakota
- [x] Truman Medical Centers
- [x] UC Davis Health
- [x] UC Health (Cincinnati)
- [x] UC Health (San Diego / Irvine / Riverside) and Affiliates
- [x] UCHealth
- [x] UConn Health
- [x] UCSF Health
- [x] UHealth – University of Miami Health System
- [x] UHS of Delaware, Inc - Central
- [x] UMass Memorial Health
- [x] UNC Health Care System
- [x] Union General Hospital
- [x] United Healthcare Services, Inc.
- [x] United Medical Physicians
- [x] UnityPoint Health
- [x] University Health Care System
- [x] University Medical Center
- [x] University Medical Center of El Paso
- [x] University of Alabama Hospital
- [x] University of Mississippi Medical Center
- [x] University of Missouri Health Care
- [x] University of New Mexico
- [x] University of South Alabama Medical Center
- [x] University of Tennessee Medical Center
- [x] University of Texas Medical Branch
- [x] University of Texas Southwestern Medical Center
- [x] UPMC Central PA
- [x] Urology Partners of North Texas
- [x] UT Health San Antonio
- [x] UW Health
- [x] Virginia Department of Health
- [x] Virginia Hospital Center
- [x] Walgreens
- [x] WellSpan Health
- [x] West Tennessee Healthcare
- [x] Westchester Medical Center Health Network
- [x] Western Connecticut Health Network
- [x] Winona Health Services
- [x] Wood County Hospital
- [x] Wyoming Medical Center
- [x] Yale New Haven Health System and Yale University
- [x] Yavapai Regional Medical Center

# Development Overview

This is a React Native app version >61.5. 

## New to React Native? 

Folow the [ReactNative CLI QuickStart steps](https://reactnative.dev/docs/environment-setup) for both Android and iOS.

## Running

Install modules:
`yarn install`

To run, do:

**For iOS**

```
npm install
cd pod/
pod install
cd ..
npx react-native run-ios 
```

**For Android**

```
npm install
npx react-native run-android
```

## Generating new Version

GitHub Actions generates a new [Release](https://github.com/vitorpamplona/vaccine-certificate-tracking-app/releases) when npm version is run and pushed to the repo.

```
npm version <version number: x.x.x>
```

## Contributing

[Issues](https://github.com/Path-Check/healthpassport-provider-reader-app/issues) and [pull requests](https://github.com/Path-Check/healthpassport-provider-reader-app/pulls) are very welcome! :)

import React, {Component} from 'react';
import { View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { CardStyles as styles } from '../themes/CardStyles' 

import Moment from 'moment';

const VACCINE_MANUF = {
    "ORG-100001699": "AstraZeneca AB",
    "ORG-100030215": "BioNTech Manuf. GmbH",
    "ORG-100001417": "Janssen-Cilag Int.",
    "ORG-100031184": "Moderna Spain S.L.",
    "ORG-100006270": "Curevac AG",
    "ORG-100013793": "CanSino Biologics",
    "ORG-100020693": "China Sinopharm Int Corp.",
    "ORG-100010771": "Sinopharm Weiqida Pharm. s.r.o.",
    "ORG-100024420": "Sinopharm Zhijun Pharm. Co. Ltd.",
    "ORG-100032020": "Novavax CZ AS",
    "Gamaleya-Research-Institute": "Gamaleya Research Inst.",
    "Vector-Institute": "Vector Institute",
    "Sinovac-Biotech": "Sinovac Biotech",
    "Bharat-Biotech": "Bharat Biotech"
};

const VACCINE_PROD = {
	"EU/1/20/1528": "Comirnaty",
	"EU/1/20/1507": "Moderna",
	"EU/1/20/1525": "Janssen",
	"EU/1/21/1529": "Vaxzevria",
	"CVnCoV": "CVnCoV",
	"Sputnik-V": "Sputnik-V",
	"Convidecia": "Convidecia",
	"EpiVacCorona":  "EpiVacCorona", 
	"BBIBP-CorV": "BBIBP-CorV", 
	"Inactivated-SARS-CoV-2-Vero-Cell": "Inactiv. SARS-CoV-2", 
	"CoronaVac":  "CoronaVac", 
	"Covaxin": "Covaxin (BBV152 A, B, C)"
};

const VACCINE_PROPH = {
	"1119349007": "SARS-CoV-2 mRNA Vaccine" ,
	"1119305005": "SARS-CoV-2 Antigen Vaccine",
	"J07BX03": "COVID-19 Vaccine"
}

const TEST_TYPE = {
	"LP6464-4": "Nucleic Acid Amplification w/ Probe", 
	"LP217198-3": "Rapid Immunoassay",
}

const TEST_RESULT = {
  "260415000": "Negative",
  "260373001": "Positive",
}    

const TEST_MANUF = { 
	  "1833": "AAZ-LMB, COVID-VIRO",
    "1232": "Abbott Rapid Diagnostics, Panbio COVID-19 Ag Rapid Test",
    "1468": "ACON Laboratories, Inc, Flowflex SARS-CoV-2 Antigen rapid test",
    "1304": "AMEDA Labordiagnostik GmbH, AMP Rapid Test SARS-CoV-2 Ag",
    "1822": "Anbio (Xiamen) Biotechnology Co., Ltd, Rapid COVID-19 Antigen Test(Colloidal Gold)",
    "1815": "Anhui Deep Blue Medical Technology Co., Ltd, COVID-19 (SARS-CoV-2) Antigen Test Kit (Colloidal Gold) - Nasal Swab",
    "1736": "Anhui Deep Blue Medical Technology Co., Ltd, COVID-19 (SARS-CoV-2) Antigen Test Kit (Colloidal Gold)",
    "768": "ArcDia International Ltd, mariPOC SARS-CoV-2",
    "1654": "Asan Pharmaceutical CO., LTD, Asan Easy Test COVID-19 Ag",
    "2010": "Atlas Link Technology Co., Ltd., NOVA Test® SARS-CoV-2 Antigen Rapid Test Kit (Colloidal Gold Immunochromatography)",
    "1906": "Azure Biotech Inc, COVID-19 Antigen Rapid Test Device",
    "1870": "Beijing Hotgen Biotech Co., Ltd, Novel Coronavirus 2019-nCoV Antigen Test (Colloidal Gold)",
    "1331": "Beijing Lepu Medical Technology Co., Ltd, SARS-CoV-2 Antigen Rapid Test Kit",
    "1484": "Beijing Wantai Biological Pharmacy Enterprise Co., Ltd, Wantai SARS-CoV-2 Ag Rapid Test (FIA)",
    "1223": "BIOSYNEX S.A., BIOSYNEX COVID-19 Ag BSS",
    "1236": "BTNX Inc, Rapid Response COVID-19 Antigen Rapid Test",
    "1173": "CerTest Biotec, CerTest SARS-CoV-2 Card test",
    "1919": "Core Technology Co., Ltd, Coretests COVID-19 Ag Test",
    "1225": "DDS DIAGNOSTIC, Test Rapid Covid-19 Antigen (tampon nazofaringian)",
    "1375": "DIALAB GmbH, DIAQUICK COVID-19 Ag Cassette",
    "1244": "GenBody, Inc, Genbody COVID-19 Ag Test",
    "1253": "GenSure Biotech Inc, GenSure COVID-19 Antigen Rapid Kit (REF: P2004)",
    "1144": "Green Cross Medical Science Corp., GENEDIA W COVID-19 Ag",
    "1747": "Guangdong Hecin Scientific, Inc., 2019-nCoV Antigen Test Kit (colloidal gold method)",
    "1360": "Guangdong Wesail Biotech Co., Ltd, COVID-19 Ag Test Kit",
    "1437": "Guangzhou Wondfo Biotech Co., Ltd, Wondfo 2019-nCoV Antigen Test (Lateral Flow Method)",
    "1256": "Hangzhou AllTest Biotech Co., Ltd, COVID-19 and Influenza A+B Antigen Combo Rapid Test",
    "1363": "Hangzhou Clongene Biotech Co., Ltd, Covid-19 Antigen Rapid Test Kit",
    "1365": "Hangzhou Clongene Biotech Co., Ltd, COVID-19/Influenza A+B Antigen Combo Rapid Test",
    "1844": "Hangzhou Immuno Biotech Co.,Ltd, Immunobio SARS-CoV-2 Antigen ANTERIOR NASAL Rapid Test Kit (minimal invasive)",
    "1215": "Hangzhou Laihe Biotech Co., Ltd, LYHER Novel Coronavirus (COVID-19) Antigen Test Kit(Colloidal Gold)",
    "1392": "Hangzhou Testsea Biotechnology Co., Ltd, COVID-19 Antigen Test Cassette",
    "1767": "Healgen Scientific, Coronavirus Ag Rapid Test Cassette",
    "1263": "Humasis, Humasis COVID-19 Ag Test",
    "1333": "Joinstar Biomedical Technology Co., Ltd, COVID-19 Rapid Antigen Test (Colloidal Gold)",
    "1764": "JOYSBIO (Tianjin) Biotechnology Co., Ltd, SARS-CoV-2 Antigen Rapid Test Kit (Colloidal Gold)",
    "1266": "Labnovation Technologies Inc, SARS-CoV-2 Antigen Rapid Test Kit",
    "1267": "LumiQuick Diagnostics Inc, QuickProfile COVID-19 Antigen Test",
    "1268": "LumiraDX, LumiraDx SARS-CoV-2 Ag Test",
    "1180": "MEDsan GmbH, MEDsan SARS-CoV-2 Antigen Rapid Test",
    "1190": "möLab, COVID-19 Rapid Antigen Test",
    "1481": "MP Biomedicals, Rapid SARS-CoV-2 Antigen Test Card",
    "1162": "Nal von minden GmbH, NADAL COVID-19 Ag Test",
    "1420": "NanoEntek, FREND COVID-19 Ag",
    "1199": "Oncosem Onkolojik Sistemler San. ve Tic. A.S., CAT",
    "308": "PCL Inc, PCL COVID19 Ag Rapid FIA",
    "1271": "Precision Biosensor, Inc, Exdia COVID-19 Ag",
    "1341": "Qingdao Hightop Biotech Co., Ltd, SARS-CoV-2 Antigen Rapid Test (Immunochromatography)",
    "1097": "Quidel Corporation, Sofia SARS Antigen FIA",
    "1606": "RapiGEN Inc, BIOCREDIT COVID-19 Ag - SARS-CoV 2 Antigen test",
    "1604": "Roche (SD BIOSENSOR), SARS-CoV-2 Antigen Rapid Test",
    "1489": "Safecare Biotech (Hangzhou) Co. Ltd, COVID-19 Antigen Rapid Test Kit (Swab)",
    "1490": "Safecare Biotech (Hangzhou) Co. Ltd, Multi-Respiratory Virus Antigen Test Kit(Swab)  (Influenza A+B/ COVID-19)",
    "344": "SD BIOSENSOR Inc, STANDARD F COVID-19 Ag FIA",
    "345": "SD BIOSENSOR Inc, STANDARD Q COVID-19 Ag Test",
    "1319": "SGA Medikal, V-Chek SARS-CoV-2 Ag Rapid Test Kit (Colloidal Gold)",
    "2017": "Shenzhen Ultra-Diagnostics Biotec.Co.,Ltd, SARS-CoV-2 Antigen Test Kit",
    "1769": "Shenzhen Watmind Medical Co., Ltd, SARS-CoV-2 Ag Diagnostic Test Kit (Colloidal Gold)",
    "1574": "Shenzhen Zhenrui Biotechnology Co., Ltd, Zhenrui ®COVID-19 Antigen Test Cassette",
    "1218": "Siemens Healthineers, CLINITEST Rapid Covid-19 Antigen Test",
    "1114": "Sugentech, Inc, SGTi-flex COVID-19 Ag",
    "1466": "TODA PHARMA, TODA CORONADIAG Ag",
    "1934": "Tody Laboratories Int., Coronavirus (SARS-CoV 2) Antigen - Oral Fluid",
    "1443": "Vitrosens Biotechnology Co., Ltd, RapidFor SARS-CoV-2 Rapid Ag Test",
    "1246": "VivaChek Biotech (Hangzhou) Co., Ltd, Vivadiag SARS CoV 2 Ag Rapid Test",
    "1763": "Xiamen AmonMed Biotechnology Co., Ltd, COVID-19 Antigen Rapid Test Kit (Colloidal Gold)",
    "1278": "Xiamen Boson Biotech Co. Ltd, Rapid SARS-CoV-2 Antigen Test Card",
    "1456": "Xiamen Wiz Biotech Co., Ltd, SARS-CoV-2 Antigen Rapid Test",
    "1884": "Xiamen Wiz Biotech Co., Ltd, SARS-CoV-2 Antigen Rapid Test (Colloidal Gold)",
    "1296": "Zhejiang Anji Saianfu Biotech Co., Ltd, AndLucky COVID-19 Antigen Rapid Test",
    "1295": "Zhejiang Anji Saianfu Biotech Co., Ltd, reOpenTest COVID-19 Antigen Rapid Test",
    "1343": "Zhezhiang Orient Gene Biotech Co., Ltd, Coronavirus Ag Rapid Test Cassette (Swab)",
}

const DISEASE = {"840539006":"COVID-19"}
   
export default class DCCCard extends Component {

	showQR = (card) => {
    this.props.navigation.navigate({name: 'QRShow', params: {
        qr: card.rawQR, 
        title: this.formatPerson(), 
        detail: this.formatDoB(),
        signedBy: this.formatSignedBy()
      }
    });
  }

	cert = () => {
		return this.props.detail.cert ? this.props.detail.cert : this.props.detail;
	}

	formatDoB = () => {
		if (this.cert().data.dob === undefined || this.cert().data.dob === "") return "";
		return "DoB: " + Moment(this.cert().data.dob).format('MMM DD, YYYY')
	}

	formatExpiresOn = () => {
		if (this.cert().exp === undefined || this.cert().exp === "") return "";
		return Moment(this.cert().exp*1000).format('MMM DD, YYYY')
	}

	formatPerson = () => {
		if (this.cert().data.nam.gn)
			return this.cert().data.nam.gn + " " + this.cert().data.nam.fn;
		else
			return this.cert().data.nam.gnt + " " + this.cert().data.nam.fnt;
	}

	formatSignedBy = () => {
		let line = "Signed by ";
		if (this.cert().iss) 
			line += this.cert().iss;
		else 
			line += this.props.detail.pub_key.toLowerCase();

		if (this.cert().iat) {
			line += " on " + Moment(this.cert().iat * 1000).format('MMM DD, YYYY')
		}

		return line;
	}

	renderCard = () => {
		return (
			<View style={[styles.card, {backgroundColor:this.props.colors.primary}]}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Vaccination</Text>
					<FontAwesome5 style={styles.button} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>
				
				<View style={styles.row}>
					<Text style={styles.title}>{this.formatPerson()}</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.notes}>{this.formatDoB()}</Text>
				</View>

				<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />

				<FlatList 
				  listKey={this.cert().signature+"v"}
					data={this.cert().data.v} 
					keyExtractor={item => item.ci} 
					renderItem={({item}) => {
						return (	
							<View style={styles.groupLine}>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.subtitle}>{DISEASE[item.tg]} Vaccine {item.dn}/{item.sd}</Text>
								</View>
								
								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>{Moment(item.dt).format('MMM DD, YYYY')}</Text>
								</View>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>
											{VACCINE_PROPH[item.vp]}
									</Text>
								</View>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>
											{VACCINE_MANUF[item.ma]}'s {VACCINE_PROD[item.mp]}
									</Text>
								</View>
								
								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>{item.is}, {item.co}</Text>
								</View>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.notesSmall}>({item.ci})</Text>
								</View>
								<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />
							</View>
						)
					}} />		

				<FlatList 
				listKey={this.cert().signature+"t"}
					data={this.cert().data.t} 
					keyExtractor={item => item.ci} 
					renderItem={({item}) => {
						console.log(item);
						return (	
							<View style={styles.groupLine}>
								<View style={{alignItems: 'center'}}>
									<Text style={styles.subtitle}>{DISEASE[item.tg]} {TEST_RESULT[item.tr]} Test</Text>
								</View>
								
								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>{Moment(item.dc).format('MMM DD, YYYY')}</Text>
								</View>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>
											{TEST_TYPE[item.tt]}
									</Text>
								</View>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>
											{item.nm}
									</Text>
								</View>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.notesCenter}>
											{TEST_MANUF[item.ma]}
									</Text>
								</View>
																
								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>Center: {item.tc}</Text>
								</View>
								
								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>{item.is}, {item.co}</Text>
								</View>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.notesSmall}>({item.ci})</Text>
								</View>

								<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />
							</View>
						)
					}} />		

					<FlatList 
					listKey={this.cert().signature+"r"}
					data={this.cert().data.r} 
					keyExtractor={item => item.ci} 
					renderItem={({item}) => {
						console.log(item);
						return (	
							<View style={styles.groupLine}>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.subtitle}>{DISEASE[item.tg]} Recovery</Text>
								</View>
								
								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>Diagnosed on {Moment(item.fr).format('MMM DD, YYYY')}</Text>
								</View>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>Protected from {Moment(item.df).format('MMM DD')} to {Moment(item.du).format('MMM DD, YYYY')}</Text>
								</View>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>{item.is}, {item.co}</Text>
								</View>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.notesSmall}>({item.ci})</Text>
								</View>

								<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />
							</View>
						)
					}} />					
				
				<View style={{flexDirection:'row', alignItems: 'center'}}>
					<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
					<Text style={styles.notes}>{this.formatSignedBy()}</Text>
				</View>

				<View style={{flexDirection:'row', alignItems: 'center'}}>
					<FontAwesome5 style={styles.icon} name={'clock'} solid/>
					<Text style={styles.notes}>Valid until: {this.formatExpiresOn()}</Text>
				</View>
			</View>
		);
	}


	render() {
		return this.props.pressable ? 
		( <TouchableOpacity onPress={() => this.showQR(this.props.detail)}>
				{this.renderCard()}
			</TouchableOpacity>
		) : this.renderCard();
	}
}
import React, {Component} from 'react';
import { StyleSheet, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

import { CardStyles as styles } from '../themes/CardStyles' 

const VACCINE_CODES = {
	54	:'adenovirus, type 4',
	55	:'adenovirus, type 7',
	82	:'adenovirus, unspecified formulation',
	24	:'anthrax',
	19	:'BCG',
	27	:'botulinum antitoxin',
	26	:'cholera, unspecified formulation',
	29	:'CMVIG',
	56	:'dengue fever',
	12	:'diphtheria antitoxin',
	28	:'DT (pediatric)',
	20	:'DTaP',
	106	:'DTaP, 5 pertussis antigens',
	107	:'DTaP, unspecified formulation',
	110	:'DTaP-Hep B-IPV',
	50	:'DTaP-Hib',
	120	:'DTaP-Hib-IPV',
	130	:'DTaP-IPV',
	1	:'DTP',
	22	:'DTP-Hib',
	102	:'DTP-Hib-Hep B',
	57	:'hantavirus',
	52	:'Hep A, adult',
	83	:'Hep A, ped/adol, 2 dose',
	84	:'Hep A, ped/adol, 3 dose',
	31	:'Hep A, pediatric, unspecified formulation',
	85	:'Hep A, unspecified formulation',
	104	:'Hep A-Hep B',
	30	:'HBIG',
	8	:'Hep B, adolescent or pediatric',
	42	:'Hep B, adolescent/high risk infant',
	43	:'Hep B, adult',
	44	:'Hep B, dialysis',
	45	:'Hep B, unspecified formulation',
	58	:'Hep C',
	59	:'Hep E',
	60	:'herpes simplex 2',
	46	:'Hib (PRP-D)',
	47	:'Hib (HbOC)',
	48	:'Hib (PRP-T)',
	49	:'Hib (PRP-OMP)',
	17	:'Hib, unspecified formulation',
	51	:'Hib-Hep B',
	61	:'HIV',
	118	:'HPV, bivalent',
	62	:'HPV, quadrivalent',
	86	:'IG',
	87	:'IGIV',
	14	:'IG, unspecified formulation',
	111	:'influenza, live, intranasal',
	15	:'influenza, split (incl. purified surface antigen)',
	16	:'influenza, whole',
	88	:'influenza, unspecified formulation',
	123	:'influenza, H5N1-1203',
	10	:'IPV',
	2	:'OPV',
	89	:'polio, unspecified formulation',
	39	:'Japanese encephalitis SC',
	63	:'Junin virus',
	64	:'leishmaniasis',
	65	:'leprosy',
	66	:'Lyme disease',
	3	:'MMR',
	4	:'M/R',
	94	:'MMRV',
	67	:'malaria',
	5	:'measles',
	68	:'melanoma',
	32	:'meningococcal MPSV4',
	103	:'meningococcal C conjugate',
	114	:'meningococcal MCV4P',
	108	:'meningococcal ACWY, unspecified formulation',
	7	:'mumps',
	69	:'parainfluenza-3',
	11	:'pertussis',
	23	:'plague',
	33	:'pneumococcal polysaccharide PPV23',
	100	:'pneumococcal conjugate PCV 7',
	109	:'pneumococcal, unspecified formulation',
	70	:'Q fever',
	18	:'rabies, intramuscular injection',
	40	:'rabies, intradermal injection',
	90	:'rabies, unspecified formulation',
	72	:'rheumatic fever',
	73	:'Rift Valley fever',
	34	:'RIG',
	119	:'rotavirus, monovalent',
	122	:'rotavirus, unspecified formulation',
	116	:'rotavirus, pentavalent',
	74	:'rotavirus, tetravalent',
	71	:'RSV-IGIV',
	93	:'RSV-MAb',
	6	:'rubella',
	38	:'rubella/mumps',
	76	:'Staphylococcus bacterio lysate',
	113	:'Td (adult), 5 Lf tetanus toxoid, preservative free, adsorbed',
	9	:'Td (adult), 2 Lf tetanus toxoid, preservative free, adsorbed',
	115	:'Tdap',
	35	:'tetanus toxoid, adsorbed',
	112	:'tetanus toxoid, unspecified formulation',
	77	:'tick-borne encephalitis',
	13	:'TIG',
	95	:'TST-OT tine test',
	96	:'TST-PPD intradermal',
	97	:'TST-PPD tine test',
	98	:'TST, unspecified formulation',
	78	:'tularemia vaccine',
	91	:'typhoid, unspecified formulation',
	25	:'typhoid, oral',
	41	:'typhoid, parenteral',
	53	:'typhoid, parenteral, AKD (U.S. military)',
	101	:'typhoid, ViCPs',
	75	:'vaccinia (smallpox)',
	105	:'vaccinia (smallpox) diluted',
	79	:'vaccinia immune globulin',
	21	:'varicella',
	81	:'VEE, inactivated',
	80	:'VEE, live',
	92	:'VEE, unspecified formulation',
	36	:'VZIG',
	117	:'VZIG (IND)',
	37	:'yellow fever',
	121	:'zoster live',
	998	:'no vaccine administered',
	999	:'unknown',
	99	:'RESERVED - do not use',
	133	:'Pneumococcal conjugate PCV 13',
	134	:'Japanese Encephalitis IM',
	137	:'HPV, unspecified formulation',
	136	:'Meningococcal MCV4O',
	135	:'Influenza, high dose seasonal',
	131	:'typhus, historical',
	132	:'DTaP-IPV-HIB-HEP B, historical',
	128	:'Novel Influenza-H1N1-09, all formulations',
	125	:'Novel Influenza-H1N1-09, nasal',
	126	:'Novel influenza-H1N1-09, preservative-free',
	127	:'Novel influenza-H1N1-09',
	138	:'Td (adult)',
	139	:'Td(adult) unspecified formulation',
	140	:'Influenza, seasonal, injectable, preservative free',
	129	:'Japanese Encephalitis, unspecified formulation',
	141	:'Influenza, seasonal, injectable',
	142	:'tetanus toxoid, not adsorbed',
	143	:'Adenovirus types 4 and 7',
	144	:'influenza, seasonal, intradermal, preservative free',
	145	:'RSV-MAb (new)',
	146	:'DTaP,IPV,Hib,HepB',
	147	:'meningococcal MCV4, unspecified formulation',
	148	:'Meningococcal C/Y-HIB PRP',
	149	:'influenza, live, intranasal, quadrivalent',
	150	:'influenza, injectable, quadrivalent, preservative free',
	151	:'influenza nasal, unspecified formulation',
	152	:'Pneumococcal Conjugate, unspecified formulation',
	153	:'Influenza, injectable, MDCK, preservative free',
	154	:'Hep A, IG',
	155	:'influenza, recombinant, injectable, preservative free',
	156	:'Rho(D)-IG',
	157	:'Rho(D) -IG IM',
	158	:'influenza, injectable, quadrivalent',
	159	:'Rho(D) - Unspecified formulation',
	160	:'Influenza A monovalent (H5N1), ADJUVANTED-2013',
	801	:'AS03 Adjuvant',
	161	:'Influenza, injectable,quadrivalent, preservative free, pediatric',
	162	:'meningococcal B, recombinant',
	163	:'meningococcal B, OMV',
	164	:'meningococcal B, unspecified',
	165	:'HPV9',
	166	:'influenza, intradermal, quadrivalent, preservative free',
	167	:'meningococcal, unknown serogroups',
	168	:'influenza, trivalent, adjuvanted',
	169	:'Hep A, live attenuated',
	170	:'DTAP/IPV/HIB - non-US',
	171	:'Influenza, injectable, MDCK, preservative free, quadrivalent',
	172	:'cholera, WC-rBS',
	173	:'cholera, BivWC',
	174	:'cholera, live attenuated',
	175	:'Rabies - IM Diploid cell culture',
	176	:'Rabies - IM fibroblast culture',
	177	:'PCV10',
	178	:'OPV bivalent',
	179	:'OPV ,monovalent, unspecified',
	180	:'tetanus immune globulin',
	181	:'anthrax immune globulin',
	182	:'OPV, Unspecified',
	183	:'Yellow fever vaccine - alt',
	184	:'Yellow fever, unspecified formulation',
	185	:'influenza, recombinant, quadrivalent,injectable, preservative free',
	186	:'Influenza, injectable, MDCK, quadrivalent, preservative',
	187	:'zoster recombinant',
	188	:'zoster, unspecified formulation',
	189	:'HepB-CpG',
	190	:'Typhoid conjugate vaccine (TCV)',
	191	:'meningococcal A polysaccharide (non-US)',
	192	:'meningococcal AC polysaccharide (non-US)',
	193	:'Hep A-Hep B, pediatric/adolescent',
	194	:'Influenza, Southern Hemisphere',
	195	:'DT, IPV adsorbed',
	196	:'Td, adsorbed, preservative free, adult use, Lf unspecified',
	197	:'influenza, high-dose, quadrivalent',
	200	:'influenza, Southern Hemisphere, pediatric, preservative free',
	201	:'influenza, Southern Hemisphere, preservative free',
	202	:'influenza, Southern Hemisphere, quadrivalent, with preservative',
	198	:'DTP-hepB-Hib Pentavalent Non-US',
	203	:'meningococcal polysaccharide (groups A, C, Y, W-135) TT conjugate',
	205	:'Influenza vaccine, quadrivalent, adjuvanted',
	206	:'Smallpox monkeypox vaccine (National Stockpile)',
	207	:'Moderna, COVID-19, mRNA, LNP-S, PF, 100 mcg/0.5 mL dose',
	208	:'Pfizer, COVID-19, mRNA, LNP-S, PF, 30 mcg/0.3 mL dose',
	213	:'SARS-COV-2 (COVID-19) vaccine, UNSPECIFIED',
	210	:'AstraZeneca, COVID-19 vaccine, vector-nr, rS-ChAdOx1, PF, 0.5 mL ',
	212	:'J&J/Janssen, COVID-19 vaccine, vector-nr, rS-Ad26, PF, 0.5 mL',
	204	:'Ebola Zaire vaccine, live, recombinant, 1mL dose',
	214	:'Ebola, unspecified',
	211	:'Novavax, COVID-19 vaccine, Subunit, rS-nanoparticle+Matrix-M1 Adjuvant, PF, 0.5 mL'
}


export default class SHCCard extends Component {

	patientRecords = () => {
		return this.props.detail.cert.vc.credentialSubject.fhirBundle.entry.filter(entry => entry.resource.resourceType === "Patient");
	}

	otherRecords = () => {
		return this.props.detail.cert.vc.credentialSubject.fhirBundle.entry.filter(entry => entry.resource.resourceType !== "Patient");
	}

	patientName = () => {
		let pat = this.patientRecords();
		return pat[0].resource.name[0].given.join(' ') + " " + pat[0].resource.name[0].family
	}

	patientDob = () => {
		let pat = this.patientRecords();
		return new Date(pat[0].resource.birthDate);
	}

	issuerName = (card) => {
		if (card.pub_key.toLowerCase() === "https://myvaccinerecord.cdph.ca.gov/creds") 
			return "State of California"
		return card.pub_key.toLowerCase();
	}

	issuedAt = (card) => {
		return Moment(new Date(parseInt(card.cert.nbf)*1000)).format('MMM DD, YYYY');
	}

	showQR = (card) => {
    this.props.navigation.navigate({name: 'QRShow', params: {
        qr: card.rawQR, 
        title: this.patientName(), 
        detail: "DoB: " + Moment(this.patientDob()).format('MMM DD, YYYY'),
        signedBy: this.issuerName(card) + " on " + this.issuedAt(card)
      }
    });
  }

	renderCard = () => {
		return (
			<View style={[styles.card, {backgroundColor:this.props.colors.primary}]}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Vaccine Record</Text>
					<FontAwesome5 style={styles.button} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.title}>{this.patientName()}</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>DoB: {Moment(this.patientDob()).format('MMM DD, YYYY')}</Text>
				</View>
				
				<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />

				<FlatList 
					data={this.otherRecords()} 
					keyExtractor={item => item.fullUrl} 
					renderItem={({item}) => {
						return (	
							<View style={styles.groupLine}>
								<View style={styles.row}>
									<Text style={styles.notes}>{item.resource.resourceType} at {item.resource.occurrenceDateTime}</Text>
								</View>
								
								<View style={styles.row}>
									<Text style={styles.notes}>
											Vaccine: {VACCINE_CODES[item.resource.vaccineCode.coding[0].code]}, Lot #{item.resource.lotNumber}
									</Text>
								</View>
							</View>
						)
					}} />
					
				<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />
				
				<View style={{flexDirection:'row', alignItems: 'center'}}>
					<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
					<Text style={styles.notes}>{this.issuerName(this.props.detail)} on {this.issuedAt(this.props.detail)}</Text>
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

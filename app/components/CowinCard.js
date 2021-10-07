import React, {Component} from 'react';
import { StyleSheet, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

import { CardStyles as styles } from '../themes/CardStyles' 

const TRUST_REGISTRY = {
	"did:india": "Gov of India",
	"did:srilanka:moh":  "Gov of Sri Lanka",
	"did:philippines": "Gov of Philippines"
}

export default class CowinCard extends Component {
  issuerName = card => {
    if (TRUST_REGISTRY[card.pub_key.toLowerCase()]) {
      return TRUST_REGISTRY[card.pub_key.toLowerCase()];
    }
    return card.pub_key.toLowerCase();
  };

  issuedAt = card => {
    return Moment(card.cert.issuanceDate).format('MMM DD, YYYY');
  };

  showQR = card => {
    this.props.navigation.navigate({
      name: 'QRShow',
      params: {
        qr: card.rawQR,
        title: card.cert.credentialSubject.name,
        detail: card.cert.credentialSubject.id.substring(4),
        signedBy: this.issuerName(card) + ' on ' + this.issuedAt(card),
      },
    });
  };

  formatPerson = () => {
    if (this.cert().credentialSubject.name) {
      let names = this.cert().credentialSubject.name.trim().split(' ');
      for (i = 1; i < names.length - 1; i++) {
        names[i] = names[i][0];
      }
      return names.join(' ');
    } else return undefined;
  };

  cert = () => {
    return this.props.detail.cert ? this.props.detail.cert : this.props.detail;
  };

  formatDoB = () => {
    let str = [];

		if (this.cert().credentialSubject.id && this.cert().credentialSubject.id !== 'NA')
      str.push(this.cert().credentialSubject.id.replace('did:', '').replace(' Card',""));
		else 
	  if (this.cert().credentialSubject.refId)
      str.push("ID: " + this.cert().credentialSubject.refId);

    if (this.cert().credentialSubject.age)
      str.push(this.cert().credentialSubject.age + 'yrs');

    if (this.cert().credentialSubject.gender)
      str.push(this.cert().credentialSubject.gender);

    if (this.cert().credentialSubject.sex)
      str.push(this.cert().credentialSubject.sex);

    return str.join(', ');
  };

	formatManufacturer = (item) => {
		if (item.vaccine === item.manufacturer)
			return undefined;

		if (this.cert().proof.verificationMethod !== "did:india") 
			return item.vaccine;
		else 
			return item.manufacturer;
	}

	formatBrand = (item) => {
		if (this.cert().proof.verificationMethod === "did:india") 
			return item.vaccine;
		else 
			return item.manufacturer.replace(/\([^()]*\)/g, "")
	}

	formatBatch = (item) => {
		if (item.batch)
			return item.batch.replace(item.vaccine, "").replace(" -","").replace("#","").replace(" ", "");
		return undefined;
	}

  renderCard = () => {
    return (
      <View style={[styles.card, {backgroundColor: this.props.colors.primary}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.notes}>
            {Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} -
            COVID Vaccine
          </Text>
          <FontAwesome5
            style={styles.button}
            name={'trash'}
            onPress={() => this.props.removeItem(this.props.detail.signature)}
            solid
          />
        </View>

        {this.formatPerson() && (
          <View style={styles.row}>
            <Text style={styles.title}>{this.formatPerson()}</Text>
          </View>
        )}

        {this.formatDoB() && (
          <View style={styles.row}>
            <Text style={styles.notes}>{this.formatDoB()}</Text>
          </View>
        )}

        <Divider
	          style={[
            styles.divisor,
            {borderBottomColor: this.props.colors.cardText},
          ]}
        />

        <FlatList
          data={this.cert().evidence}
          keyExtractor={item => item.certificateId}
          renderItem={({item}) => {
            return (
              <View>
								<View  style={{alignItems: 'center'}}>
									<Text style={styles.subtitle}>COVID Vaccine {item.dose} of {item.totalDoses}</Text>
								</View>

								<View style={{alignItems: 'center'}}>
                  <Text style={styles.notes}>{this.formatBrand(item)} #{this.formatBatch(item)}</Text>
                </View>

								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>{Moment(item.date).format('MMM DD, YYYY')}</Text>
								</View>

								{ item.certificateId && 
								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>Cert ID: {item.certificateId}</Text>
                </View>
								}

								{ item.effectiveStart && 
								<View style={{alignItems: 'center'}}>
									<Text style={styles.notes}>Effective from {Moment(item.effectiveStart).format('MMM DD')} to {Moment(item.effectiveUntil).format('MMM DD, YYYY')}</Text>
								</View>
								}

								{ this.formatManufacturer(item) && 
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.notesSmall}>{this.formatManufacturer(item)}</Text>
                </View>
								}

								{ item.prophylaxis && 
								<View style={{alignItems: 'center'}}>
                  <Text style={styles.notesSmall}>{item.prophylaxis}</Text>
                </View>
								}
              </View>
            );
          }}
        />

        <Divider
          style={[
            styles.divisor,
            {borderBottomColor: this.props.colors.cardText},
          ]}
        />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome5 style={styles.icon} name={'check-circle'} solid />
          <Text style={styles.notes}>
            {this.issuerName(this.props.detail)} on{' '}
            {this.issuedAt(this.props.detail)}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return this.props.pressable ? (
      <TouchableOpacity onPress={() => this.showQR(this.props.detail)}>
        {this.renderCard()}
      </TouchableOpacity>
    ) : (
      this.renderCard()
    );
  }
}
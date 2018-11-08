import React, { Component }  from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Container, Content, Button, Text, Item, Input, Picker } from 'native-base';
import Modal from "react-native-modal";
import styles from '../Styles';

export const DIALOG_TYPE_TEXT = 1;

export const DIALOG_TYPE_DIE_CODE = 2;

export default class AttributeDialog extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        type: PropTypes.number.isRequired,
        identifier: PropTypes.string.isRequired,
        dice: PropTypes.string,
        pips: PropTypes.number,
        info: PropTypes.string,
        close: PropTypes.func,
        onSave: PropTypes.func,
        onUpdateDice: PropTypes.func,
        onUpdatePips: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            dice: props.dice,
            pips: props.pips
        }
    }

    _renderEditDieCode() {
        return (
            <View style={localStyles.modalContent}>
                <Text style={[styles.heading, {paddingTop: 0}]}>Edit {this.props.identifier}</Text>
                <View style={localStyles.rowStart}>
                    <View style={localStyles.row}>
                        <Item regular>
                            <Input
                                style={styles.grey}
                                keyboardType='numeric'
                                maxLength={2}
                                value={this.props.dice}
                                onChangeText={(value) => this.props.onUpdateDice(value)}
                            />
                        </Item>
                    </View>
                    <View style={localStyles.row}>
                        <Picker
                            inlinelabel
                            label='Pips'
                            style={styles.grey}
                            textStyle={styles.grey}
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.props.pips}
                            onValueChange={(value) => this.props.onUpdatePips(value)}
                        >
                            <Item label="+0 pips" value={0} />
                            <Item label="+1 pip" value={1} />
                            <Item label="+2 pips" value={2} />
                        </Picker>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button block style={styles.button} onPress={() => this.props.onSave()}>
                        <Text uppercase={false}>Save</Text>
                    </Button>
                </View>
            </View>
        );
    }

    _renderInfo() {
        return (
            <View style={localStyles.modalContent}>
                <Text style={[styles.heading, {paddingTop: 0}]}>{this.props.identifier}</Text>
                <Text style={styles.grey}>{this.props.info}</Text>
                <View style={styles.buttonContainer}>
                    <Button block style={styles.button} onPress={() => this.props.close()}>
                        <Text uppercase={false}>Close</Text>
                    </Button>
                </View>
            </View>
        );
    }

	render() {
        return (
            <Modal
                isVisible={this.props.visible}
                swipeDirection={'right'}
                onSwipe={() => this.props.close()}
                onBackButtonPress={() => this.props.close()}
                onBackdropPress={() => this.props.close()}
            >
                {this.props.type === DIALOG_TYPE_DIE_CODE ? this._renderEditDieCode() : this._renderInfo()}
            </Modal>
        );
	}
}

const localStyles = StyleSheet.create({
	rowStart: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row'
	},
	row: {
	    flex: 1,
	    alignSelf: 'center',
	},
	modalContent: {
        backgroundColor: '#111111',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: '#00ACED',
        minHeight: 200
    }
});
function getArrayOfObjets(arrayFormInstance){
	numRow = arrayFormInstance.length;
	let arrayOfObjets = [];
	for(i = 0; i < numRow; i++){
		arrayOfObjets[i] = {nome: arrayFormInstance[i][0], sobrenome: arrayFormInstance[i][1], idade: arrayFormInstance[i][2], altura: arrayFormInstance[i][3], peso: arrayFormInstance[i][4]};
	}
	return arrayOfObjets
}

function getMessageToConsole(arrayFormInstance,arrayReturnedValues,numProperty){
	switch (numProperty){
		case 2:
			console.log(`Com ${arrayReturnedValues[1]} anos, ${arrayFormInstance[arrayReturnedValues[0]][0]} ${arrayFormInstance[arrayReturnedValues[0]][1]} é a pessoa de maior idade no grupo`);
			console.log(`Com ${arrayReturnedValues[3]} anos, ${arrayFormInstance[arrayReturnedValues[2]][0]} ${arrayFormInstance[arrayReturnedValues[2]][1]} é a pessoa de menor idade no grupo`);
			break;
		case 3:
			console.log(`Com ${arrayReturnedValues[1]} m, ${arrayFormInstance[arrayReturnedValues[0]][0]} ${arrayFormInstance[arrayReturnedValues[0]][1]} é a pessoa de maior altura no grupo`);
			console.log(`Com ${arrayReturnedValues[3]} m, ${arrayFormInstance[arrayReturnedValues[2]][0]} ${arrayFormInstance[arrayReturnedValues[2]][1]} é a pessoa de menor altura no grupo`);
			break;
		case 4:
			console.log(`Com ${arrayReturnedValues[1]} kg, ${arrayFormInstance[arrayReturnedValues[0]][0]} ${arrayFormInstance[arrayReturnedValues[0]][1]} é a pessoa de maior massa corporal no grupo`);
			console.log(`Com ${arrayReturnedValues[3]} kg, ${arrayFormInstance[arrayReturnedValues[2]][0]} ${arrayFormInstance[arrayReturnedValues[2]][1]} é a pessoa de menor massa corporal no grupo`);
	}

}

function messageOnPrompt(numPerson,numProperty){
	switch (numProperty){
		case 0:
			return "Por favor, digite o nome da pessoa número: " + numPerson
			break;
		case 1:
			return "Por favor, digite o sobrenome da pessoa número: " + numPerson
			break;
		case 2:
			return "Por favor, digite a idade da pessoa número: " + numPerson
			break;
		case 3:
			return "Por favor, digite a altura en metros [m] da pessoa número: " + numPerson
			break;
		case 4:
			return "Por favor, digite o peso en kilogramos [kg] da pessoa número: " + numPerson
	}
}

function messageOnAlert(numProperty){
	switch (numProperty){
		case 0:
		case 1:
			return "Você deve digitar uma sequência de texto ou cancelar!"
			break;
		case 2:
		case 3:
		case 4:
			return "Você deve digitar um valor numérico ou cancelar!"
			break;
		default:
			return "Você deve digitar um valor ou cancelar!"
	}
}

function getValueComparison(numProperty,obtainedValue,obtainedType,initialValue,expectedType){
	let arrayReturnedValues = [initialValue, false, false];
	if (obtainedType != expectedType){
		alert(messageOnAlert(numProperty));
	}else{
		arrayReturnedValues[2] = true; //exit getPropertyValue
		switch (numProperty){
			case 0:
			case 1:
				arrayReturnedValues[0] = obtainedValue.toLowerCase();
				break;
			case 2:
				arrayReturnedValues[0] = Math.round(Math.abs(obtainedValue));
				break;
			case 3:
			case 4:
				arrayReturnedValues[0] = Math.abs(obtainedValue);
		}
	}
	return arrayReturnedValues
}

function getValueInterpretation(numProperty,enteredValue,initialValue){
	let arrayReturnedValues = [];
	let interpretatedValue = Number(enteredValue);
	if (isNaN(interpretatedValue)){
		arrayReturnedValues = getValueComparison(numProperty,enteredValue,typeof(enteredValue),initialValue,typeof(initialValue));
	}else{
		arrayReturnedValues = getValueComparison(numProperty,interpretatedValue,typeof(interpretatedValue),initialValue,typeof(initialValue));
	}
	return arrayReturnedValues
}

function getValueDiscrimination(numProperty,propertyValue,inicialPropertyValue){
	let arrayReturnedValues = [inicialPropertyValue, false, false];
	switch (propertyValue){
		case null:
			arrayReturnedValues[1] = true; //exit getPersonInstance
			arrayReturnedValues[2] = true; //exit getPropertyValue
			break;
		case "":
			alert(messageOnAlert(""));
			break;
		default:
			arrayReturnedValues = getValueInterpretation(numProperty,propertyValue,inicialPropertyValue);
	}
	return arrayReturnedValues
}

function getPropertyValue(numPerson,numProperty,inicialPropertyValue){
	let exitFunction = false;
	let arrayReturnedValues = [];
	while (!exitFunction){
		propertyValue = window.prompt(messageOnPrompt(numPerson,numProperty),inicialPropertyValue);
		arrayReturnedValues = getValueDiscrimination(numProperty,propertyValue,inicialPropertyValue);
		exitFunction = arrayReturnedValues[2];
	}
	return arrayReturnedValues
}

function sendInstanceToConsole(arrayFormInstance){
	console.log(`Olá! ${arrayFormInstance[0]} ${arrayFormInstance[1]}, você tem ${arrayFormInstance[2]} anos de idade, mede ${arrayFormInstance[3]} m de altura e pesa ${arrayFormInstance[4]} kg`);
}

function buildInstanceTable(arrayFormInstance){
	if (confirm("Você deseja tabular os dados?")){
		console.table(getArrayOfObjets(arrayFormInstance));
	}
}

function getColumnPropertyValues(arrayFormInstance,numColumn){
	let columnPropertyValues = [];
	let numRows = arrayFormInstance.length;
	for (i = 0; i < numRows; i++){
		columnPropertyValues.push(arrayFormInstance[i][numColumn]);
	}
	return columnPropertyValues
}

function getMinMaxPropertyValue(columnPropertyValues){
	numProperties = columnPropertyValues.length;
	minPropertyValue = columnPropertyValues[0];
	minPropertyIndex = 0;
	maxPropertyValue = columnPropertyValues[0];
	maxPropertyIndex = 0;
	for (i = 1; i < numProperties; i++){
		if (columnPropertyValues[i] > maxPropertyValue){
			maxPropertyValue = columnPropertyValues[i];
			maxPropertyIndex = i;
		}else if (columnPropertyValues[i] < minPropertyValue){
			minPropertyValue = columnPropertyValues[i];
			minPropertyIndex = i;
		}
	}
	return [maxPropertyIndex, maxPropertyValue, minPropertyIndex, minPropertyValue]
}

function getPropertyValuesComparison(arrayFormInstance){
	numColumns = arrayFormInstance[0].length;
	let arrayReturnedValues = [];
	let arrayComparisons = [];
	let contColumn = 2;
	while (contColumn < numColumns){
		arrayReturnedValues = getMinMaxPropertyValue(getColumnPropertyValues(arrayFormInstance,contColumn));
		arrayComparisons.push(arrayReturnedValues);
		getMessageToConsole(arrayFormInstance,arrayReturnedValues,contColumn)
		contColumn = contColumn + 1;
	}
	return arrayComparisons
}


function getPersonInstance(numPerson){
	let numProperty = 0;
	let exitFunction = false;
	let arrayReturnedValues = [];
	let arrayPersonInstance = ["alessandro", "centeio", 100, 1.80, 90];
	let numProperties = arrayPersonInstance.length;
	while (numProperty < numProperties && !exitFunction){
		arrayReturnedValues = getPropertyValue(numPerson,numProperty,arrayPersonInstance[numProperty]);
		arrayPersonInstance[numProperty] = arrayReturnedValues[0];
		exitFunction = arrayReturnedValues[1];
		numProperty++;
	}
	return arrayPersonInstance
}


let Form = {
	Instance: [],
	Person: function(arrayPersonInstance){
		this.firstName = arrayPersonInstance[0];
		this.lastName = arrayPersonInstance[1];
		this.age = arrayPersonInstance[2];
		this.height = arrayPersonInstance[3];
		this.weight = arrayPersonInstance[4];
	},
	Comparisons: function(arrayFormInstance,arrayComparisons){
		this.maxAge = [`${arrayFormInstance[arrayComparisons[0][0]][0]} ${arrayFormInstance[arrayComparisons[0][0]][1]}`, arrayComparisons[0][1]];
		this.minAge = [`${arrayFormInstance[arrayComparisons[0][2]][0]} ${arrayFormInstance[arrayComparisons[0][2]][1]}`, arrayComparisons[0][3]];
		this.maxHeight = [`${arrayFormInstance[arrayComparisons[1][0]][0]} ${arrayFormInstance[arrayComparisons[1][0]][1]}`, arrayComparisons[1][1]];
		this.minHeight = [`${arrayFormInstance[arrayComparisons[1][2]][0]} ${arrayFormInstance[arrayComparisons[1][2]][1]}`, arrayComparisons[1][3]];
		this.maxWeight = [`${arrayFormInstance[arrayComparisons[2][0]][0]} ${arrayFormInstance[arrayComparisons[2][0]][1]}`, arrayComparisons[2][1]];
		this.minWeight = [`${arrayFormInstance[arrayComparisons[2][2]][0]} ${arrayFormInstance[arrayComparisons[2][2]][1]}`, arrayComparisons[2][3]];
	},
	getFormInstance: function(){
		let numPerson = 1;
		let arrayFormInstance = [];
		let arrayInstanceComparison = [];
		let exitFunction = false;
		while (!exitFunction){
			arrayFormInstance.push(getPersonInstance(numPerson));
			sendInstanceToConsole(arrayFormInstance[numPerson-1]);
			exitFunction = !confirm("Você deseja inserir outro registro?");
			numPerson++;
		}
		buildInstanceTable(arrayFormInstance)
		arrayComparisons = getPropertyValuesComparison(arrayFormInstance);
		
		numRows = arrayFormInstance.length;
		for (i = 0; i < numRows; i++){
			Form.Instance.push(new Form.Person(arrayFormInstance[i]));
		}
		Form.Instance.push(new Form.Comparisons(arrayFormInstance,arrayComparisons))
		return Form.Instance
	},
};

let myNewForm = Form.getFormInstance();
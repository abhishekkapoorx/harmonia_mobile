import { Input } from '@/components/auth/Input';
import { BackButtonBar } from '@/components/BackButtonBar';
import { StatusBar } from 'expo-status-bar';
import { View, FlatList, Text, Alert } from 'react-native';
import SelectPicker from '@/components/SelectPicker';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/Button';
import { router } from 'expo-router';
import axiosInstance from '@/http/axiosInstance';

// Define question types
type QuestionType = 'input' | 'select';

interface QuestionOption {
    label: string;
    value: string;
}

interface Question {
    id: keyof typeof initialValues;
    type: QuestionType;
    label: string;
    options?: QuestionOption[];
}

// Initial form values
const initialValues = {
    age: '',
    height: '',
    weight: '',
    periodRegularity: '',
    periodDuration: '',
    heavyBleeding: '',
    severeCramps: '',
    pcosDiagnosis: '',
    hirsutism: '',
    hairLoss: '',
    acneSkinIssues: '',
    weightGain: '',
    fatigue: '',
    exerciseFrequency: '',
    dietType: '',
    processedFoodConsumption: '',
    sugarCravings: '',
    waterIntake: '',
    sleepHours: '',
    sleepDisturbances: '',
    mentalHealthIssues: '',
    stressLevels: '',
    medicalHistory: '',
    medications: '',
    fertilityTreatments: ''
};

// Validation schema
const validationSchema = Yup.object().shape({
    age: Yup.number()
        .required('Age is required')
        .min(18, 'Must be at least 18 years old')
        .max(100, 'Invalid age'),
    height: Yup.number()
        .required('Height is required')
        .min(100, 'Height must be at least 100 cm')
        .max(300, 'Height must be less than 300 cm'),
    weight: Yup.number()
        .required('Weight is required')
        .min(30, 'Weight must be at least 30 kg')
        .max(500, 'Weight must be less than 500 kg'),
    periodRegularity: Yup.string().required('Please select period regularity'),
    periodDuration: Yup.string().required('Please select period duration'),
    heavyBleeding: Yup.string().required('Please select an option'),
    severeCramps: Yup.string().required('Please select severity of cramps'),
    pcosDiagnosis: Yup.string().required('Please select an option'),
    hirsutism: Yup.string().required('Please select an option'),
    hairLoss: Yup.string().required('Please select an option'),
    acneSkinIssues: Yup.string().required('Please select an option'),
    weightGain: Yup.string().required('Please select an option'),
    fatigue: Yup.string().required('Please select an option'),
    exerciseFrequency: Yup.string().required('Please select exercise frequency'),
    dietType: Yup.string().required('Please select diet type'),
    processedFoodConsumption: Yup.string().required('Please select processed food consumption'),
    sugarCravings: Yup.string().required('Please select an option'),
    waterIntake: Yup.string().required('Please select an option'),
    sleepHours: Yup.string().required('Please select sleep hours'),
    sleepDisturbances: Yup.string().required('Please select an option'),
    mentalHealthIssues: Yup.string().required('Please select an option'),
    stressLevels: Yup.string().required('Please select an option'),
    medicalHistory: Yup.string().required('Please select medical history'),
    medications: Yup.string().required('Please select an option'),
    fertilityTreatments: Yup.string().required('Please select an option')
});

// Questions data
const questions: Question[] = [
    {
        id: 'age',
        type: 'input',
        label: 'Age'
    },
    {
        id: 'height',
        type: 'input',
        label: 'Height (in cm)'
    },
    {
        id: 'weight',
        type: 'input',
        label: 'Weight (in kg)'
    },
    {
        id: 'periodRegularity',
        type: 'select',
        label: 'Menstrual Cycle Regularity',
        options: [
            { label: "Regular (28-35 days)", value: "regular" },
            { label: "Irregular (varies each month)", value: "irregular" },
            { label: "Missed periods (More than 2 months gap)", value: "missed" }
        ]
    },
    {
        id: 'periodDuration',
        type: 'select',
        label: 'How long does your period usually last?',
        options: [
            { label: "3-5 days", value: "3-5" },
            { label: "6-7 days", value: "6-7" },
            { label: "More than 7 days", value: "7+" }
        ]
    },
    {
        id: 'heavyBleeding',
        type: 'select',
        label: 'Do you experience heavy bleeding (menorrhagia)?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'severeCramps',
        type: 'select',
        label: 'Do you experience severe cramps (dysmenorrhea)?',
        options: [
            { label: "Mild", value: "mild" },
            { label: "Moderate", value: "moderate" },
            { label: "Severe", value: "severe" }
        ]
    },
    {
        id: 'pcosDiagnosis',
        type: 'select',
        label: 'Have you ever been diagnosed with PCOS or hormonal imbalance?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'hirsutism',
        type: 'select',
        label: 'Do you experience excessive hair growth in unusual areas (hirsutism)?',
        options: [
            { label: "Yes (face, chest, abdomen, back)", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'hairLoss',
        type: 'select',
        label: 'Do you experience hair thinning or scalp hair loss?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'acneSkinIssues',
        type: 'select',
        label: 'Do you frequently experience acne, oily skin, or dark skin patches?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'weightGain',
        type: 'select',
        label: 'Do you experience sudden weight gain, especially around the abdomen?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'fatigue',
        type: 'select',
        label: 'Do you experience difficulty losing weight despite diet/exercise?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'exerciseFrequency',
        type: 'select',
        label: 'How often do you exercise?',
        options: [
            { label: "4+ times a week", value: "4+" },
            { label: "1-3 times a week", value: "1-3" },
            { label: "Rarely", value: "rarely" }
        ]
    },
    {
        id: 'dietType',
        type: 'select',
        label: 'Do you follow a specific diet?',
        options: [
            { label: "High-protein", value: "high-protein" },
            { label: "Low-carb/Keto", value: "low-carb" },
            { label: "Vegetarian/Vegan", value: "vegetarian" },
            { label: "No specific diet", value: "none" }
        ]
    },
    {
        id: 'processedFoodConsumption',
        type: 'select',
        label: 'How often do you consume processed or sugary foods?',
        options: [
            { label: "Rarely", value: "rarely" },
            { label: "Occasionally", value: "occasionally" },
            { label: "Frequently", value: "frequently" }
        ]
    },
    {
        id: 'sugarCravings',
        type: 'select',
        label: 'Do you experience sugar cravings frequently?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'waterIntake',
        type: 'select',
        label: 'Do you drink enough water daily (8+ glasses)?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'sleepHours',
        type: 'select',
        label: 'How many hours do you sleep on average?',
        options: [
            { label: "7-9 hours", value: "7-9" },
            { label: "5-6 hours", value: "5-6" },
            { label: "Less than 5 hours", value: "<5" }
        ]
    },
    {
        id: 'sleepDisturbances',
        type: 'select',
        label: 'Do you experience frequent sleep disturbances or insomnia?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'mentalHealthIssues',
        type: 'select',
        label: 'Do you experience frequent mood swings, anxiety, or depression?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'stressLevels',
        type: 'select',
        label: 'Do you have high stress levels daily?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'medicalHistory',
        type: 'select',
        label: 'Have you been diagnosed with any of the following?',
        options: [
            { label: "Thyroid disorders (Hypothyroidism, Hyperthyroidism)", value: "thyroid" },
            { label: "Diabetes or Insulin Resistance", value: "diabetes" },
            { label: "High Blood Pressure", value: "hypertension" },
            { label: "Other (Specify)", value: "other" }
        ]
    },
    {
        id: 'medications',
        type: 'select',
        label: 'Are you currently taking any medications for PCOS, hormonal imbalance, or diabetes?',
        options: [
            { label: "Yes (Specify)", value: "yes" },
            { label: "No", value: "no" }
        ]
    },
    {
        id: 'fertilityTreatments',
        type: 'select',
        label: 'Have you undergone any fertility treatments?',
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    }
];

const Questioneer = () => {
    const handleSubmit = async (values: FormikValues, { setSubmitting }: any) => {
        try {
            const response = await axiosInstance.post('/user/user-details', values);
            if (response.status === 201) {
                Alert.alert('Success', response.data.msg || 'Your health details have been submitted successfully!');
                router.replace('/home');
            }
        } catch (error: any) {
            Alert.alert('Error', error?.response?.data?.msg || 'Failed to submit form. Please try again.');
            console.log("Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const renderQuestion = ({ item, values, setFieldValue, errors, touched }: any) => {
        if (item.type === 'input') {
            return (
                <View className="mb-4">
                    <Input
                        label={item.label}
                        value={values[item.id]}
                        setVal={(value) => setFieldValue(item.id, value)}
                        className="border-b-2"
                        error={touched[item.id] && errors[item.id]}
                    />
                </View>
            );
        }

        return (
            <View className="mb-4">
                <SelectPicker
                    title={item.label}
                    data={item.options || []}
                    selectedValue={values[item.id]}
                    setSelectedValue={(value) => setFieldValue(item.id, value)}
                />
                {touched[item.id] && errors[item.id] && (
                    <Text className="text-red-500 text-sm mt-1">{errors[item.id]}</Text>
                )}
            </View>
        );
    };

    return (
        <View className="flex-1 bg-gray-100 px-6 py-10">
            <StatusBar style="dark" />
            <BackButtonBar text="User Details" />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, handleSubmit, errors, touched, isSubmitting, isValid }) => (
                    <View className="flex-1">
                        <FlatList
                            data={questions}
                            renderItem={({ item }) => renderQuestion({ 
                                item, 
                                values, 
                                setFieldValue, 
                                errors, 
                                touched 
                            })}
                            keyExtractor={item => item.id}
                            contentContainerClassName="gap-8"
                            className="py-4"
                            showsVerticalScrollIndicator={false}
                        />
                        <View className="mt-4 mb-8">
                            <Button
                                disabled={!isValid || isSubmitting}
                                loading={isSubmitting}
                                onPressh={handleSubmit}
                                classNames={`bg-c6 ${(!isValid || isSubmitting) ? "opacity-70" : ""}`}
                                textClasses={`text-c1 text-xl ${(!isValid || isSubmitting) ? "opacity-70" : ""}`}
                                label="Submit Health Details"
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default Questioneer;

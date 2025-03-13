import { Input } from '@/components/auth/Input';
import { BackButtonBar } from '@/components/BackButtonBar';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import SelectPicker from '@/components/SelectPicker';

const Questioneer = () => {
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [periodRegularity, setPeriodRegularity] = useState('');
    const [periodDuration, setPeriodDuration] = useState('');
    const [heavyBleeding, setHeavyBleeding] = useState('');
    const [severeCramps, setSevereCramps] = useState('');
    const [pcosDiagnosis, setPcosDiagnosis] = useState('');
    const [hirsutism, setHirsutism] = useState('');
    const [hairLoss, setHairLoss] = useState('');
    const [acneSkinIssues, setAcneSkinIssues] = useState('');
    const [weightGain, setWeightGain] = useState('');
    const [fatigue, setFatigue] = useState('');
    const [exerciseFrequency, setExerciseFrequency] = useState('');
    const [dietType, setDietType] = useState('');
    const [processedFoodConsumption, setProcessedFoodConsumption] = useState('');
    const [sugarCravings, setSugarCravings] = useState('');
    const [waterIntake, setWaterIntake] = useState('');
    const [sleepHours, setSleepHours] = useState('');
    const [sleepDisturbances, setSleepDisturbances] = useState('');
    const [mentalHealthIssues, setMentalHealthIssues] = useState('');
    const [stressLevels, setStressLevels] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [medications, setMedications] = useState('');
    const [fertilityTreatments, setFertilityTreatments] = useState('');

    return (
        <View className="flex-1 bg-gray-100 px-6 py-10">
            <StatusBar style="dark" />
            <BackButtonBar text="User Details" />
            <ScrollView className='flex-1'>
                <View className='mt-12 gap-8'>
                    <Input label="Age" value={age} setVal={setAge} className='border-b-2' />
                    <Input label="Height" value={height} setVal={setHeight} className='border-b-2' />
                    <Input label="Weight" value={weight} setVal={setWeight} className='border-b-2' />

                    <SelectPicker title="Menstrual Cycle Regularity" data={[
                        { label: "Regular (28-35 days)", value: "regular" },
                        { label: "Irregular (varies each month)", value: "irregular" },
                        { label: "Missed periods (More than 2 months gap)", value: "missed" }
                    ]} selectedValue={periodRegularity} setSelectedValue={setPeriodRegularity} />

                    <SelectPicker
                        title="How long does your period usually last?"
                        data={[
                            { label: "3-5 days", value: "3-5" },
                            { label: "6-7 days", value: "6-7" },
                            { label: "More than 7 days", value: "7+" }
                        ]}
                        selectedValue={periodDuration}
                        setSelectedValue={setPeriodDuration}
                    />

                    <SelectPicker
                        title="Do you experience heavy bleeding (menorrhagia)?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={heavyBleeding}
                        setSelectedValue={setHeavyBleeding}
                    />

                    <SelectPicker
                        title="Do you experience severe cramps (dysmenorrhea)?"
                        data={[
                            { label: "Mild", value: "mild" },
                            { label: "Moderate", value: "moderate" },
                            { label: "Severe", value: "severe" }
                        ]}
                        selectedValue={severeCramps}
                        setSelectedValue={setSevereCramps}
                    />

                    <SelectPicker
                        title="Have you ever been diagnosed with PCOS or hormonal imbalance?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={pcosDiagnosis}
                        setSelectedValue={setPcosDiagnosis}
                    />

                    <SelectPicker
                        title="Do you experience excessive hair growth in unusual areas (hirsutism)?"
                        data={[
                            { label: "Yes (face, chest, abdomen, back)", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={hirsutism}
                        setSelectedValue={setHirsutism}
                    />

                    <SelectPicker
                        title="Do you experience hair thinning or scalp hair loss?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={hairLoss}
                        setSelectedValue={setHairLoss}
                    />

                    <SelectPicker
                        title="Do you frequently experience acne, oily skin, or dark skin patches?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={acneSkinIssues}
                        setSelectedValue={setAcneSkinIssues}
                    />

                    <SelectPicker
                        title="Do you experience sudden weight gain, especially around the abdomen?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={weightGain}
                        setSelectedValue={setWeightGain}
                    />

                    <SelectPicker
                        title="Do you experience difficulty losing weight despite diet/exercise?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={fatigue}
                        setSelectedValue={setFatigue}
                    />

                    <SelectPicker
                        title="How often do you exercise?"
                        data={[
                            { label: "4+ times a week", value: "4+" },
                            { label: "1-3 times a week", value: "1-3" },
                            { label: "Rarely", value: "rarely" }
                        ]}
                        selectedValue={exerciseFrequency}
                        setSelectedValue={setExerciseFrequency}
                    />

                    <SelectPicker
                        title="Do you follow a specific diet?"
                        data={[
                            { label: "High-protein", value: "high-protein" },
                            { label: "Low-carb/Keto", value: "low-carb" },
                            { label: "Vegetarian/Vegan", value: "vegetarian" },
                            { label: "No specific diet", value: "none" }
                        ]}
                        selectedValue={dietType}
                        setSelectedValue={setDietType}
                    />

                    <SelectPicker
                        title="How often do you consume processed or sugary foods?"
                        data={[
                            { label: "Rarely", value: "rarely" },
                            { label: "Occasionally", value: "occasionally" },
                            { label: "Frequently", value: "frequently" }
                        ]}
                        selectedValue={processedFoodConsumption}
                        setSelectedValue={setProcessedFoodConsumption}
                    />

                    <SelectPicker
                        title="Do you experience sugar cravings frequently?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={sugarCravings}
                        setSelectedValue={setSugarCravings}
                    />

                    <SelectPicker
                        title="Do you drink enough water daily (8+ glasses)?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={waterIntake}
                        setSelectedValue={setWaterIntake}
                    />

                    <SelectPicker
                        title="How many hours do you sleep on average?"
                        data={[
                            { label: "7-9 hours", value: "7-9" },
                            { label: "5-6 hours", value: "5-6" },
                            { label: "Less than 5 hours", value: "<5" }
                        ]}
                        selectedValue={sleepHours}
                        setSelectedValue={setSleepHours}
                    />

                    <SelectPicker
                        title="Do you experience frequent sleep disturbances or insomnia?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={sleepDisturbances}
                        setSelectedValue={setSleepDisturbances}
                    />

                    <SelectPicker
                        title="Do you experience frequent mood swings, anxiety, or depression?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={mentalHealthIssues}
                        setSelectedValue={setMentalHealthIssues}
                    />

                    <SelectPicker
                        title="Do you have high stress levels daily?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={stressLevels}
                        setSelectedValue={setStressLevels}
                    />

                    <SelectPicker
                        title="Have you been diagnosed with any of the following?"
                        data={[
                            { label: "Thyroid disorders (Hypothyroidism, Hyperthyroidism)", value: "thyroid" },
                            { label: "Diabetes or Insulin Resistance", value: "diabetes" },
                            { label: "High Blood Pressure", value: "hypertension" },
                            { label: "Other (Specify)", value: "other" }
                        ]}
                        selectedValue={medicalHistory}
                        setSelectedValue={setMedicalHistory}
                    />

                    <SelectPicker
                        title="Are you currently taking any medications for PCOS, hormonal imbalance, or diabetes?"
                        data={[
                            { label: "Yes (Specify)", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={medications}
                        setSelectedValue={setMedications}
                    />

                    <SelectPicker
                        title="Have you undergone any fertility treatments?"
                        data={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]}
                        selectedValue={fertilityTreatments}
                        setSelectedValue={setFertilityTreatments}
                    />

                </View>
            </ScrollView>
        </View>
    );
};

export default Questioneer;

import React, { useState } from 'react';
import { View, Switch, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardFooter } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { PredictionInputData } from '@/http/api/predictions';
import { Input } from '~/components/ui/input';
import { ChevronDown } from '~/lib/icons/ChevronDown';

interface LabTestPredictionFormProps {
  initialValues: FormValues;
  onSubmit: (values: Partial<PredictionInputData>) => void;
  isLoading: boolean;
}

// Create type-safe initial values based on PredictionInputData
export type FormValues = {
  [K in keyof PredictionInputData]: string | boolean;
};

// Create validation schema
const validationSchema = Yup.object({
  age: Yup.number().required('Age is required').positive('Must be positive').max(100, 'Invalid age'),
  weight: Yup.number().required('Weight is required').positive('Must be positive'),
  bmi: Yup.number().required('BMI is required').positive('Must be positive'),
  blood_group: Yup.string().required('Blood group is required'),
  waist_hip_ratio: Yup.number().positive('Must be positive'),
  bp_systolic: Yup.number().positive('Must be positive'),
  bp_diastolic: Yup.number().positive('Must be positive'),
});

const bloodGroupOptions = [
  { label: 'Select Blood Group', value: '' },
  { label: 'A+', value: '11' },
  { label: 'A-', value: '12' },
  { label: 'B+', value: '13' },
  { label: 'B-', value: '14' },
  { label: 'O+', value: '15' },
  { label: 'O-', value: '16' },
  { label: 'AB+', value: '17' },
  { label: 'AB-', value: '18' },
];

const abortionOptions = [
  { label: 'Select Option', value: '' },
  { label: 'Had abortion', value: '1' },
  { label: 'Didn\'t have abortions', value: '0' },
];

const cyclerOptions = [
  { label: 'Regular', value: '1' },
  { label: 'Irregular', value: '0' },
];

const LabTestPredictionForm = ({ 
  initialValues,
  onSubmit,
  isLoading
}: LabTestPredictionFormProps) => {
  
  const renderSwitchField = (
    label: string, 
    field: keyof FormValues, 
    formikProps: FormikProps<FormValues>
  ) => (
    <View className="flex-row justify-between items-center py-2">
      <Text className="text-sm font-medium text-foreground">{label}</Text>
      <Switch
        value={Boolean(formikProps.values[field])}
        onValueChange={(value) => {
          formikProps.setFieldValue(field, value);
        }}
        trackColor={{ false: '#767577', true: '#4f46e5' }}
        thumbColor={Boolean(formikProps.values[field]) ? '#fff' : '#f4f3f4'}
      />
    </View>
  );
  
  const renderTextField = (
    label: string, 
    field: keyof FormValues, 
    placeholder: string, 
    unit: string = '',
    formikProps: FormikProps<FormValues>
  ) => (
    <View className="mb-3">
      <Text className="text-sm font-medium text-foreground mb-1.5">{label}{unit ? ` (${unit})` : ''}</Text>
      <Input
        value={String(formikProps.values[field] || '')}
        onChangeText={(text) => formikProps.setFieldValue(field, text)}
        keyboardType="numeric"
        placeholder={placeholder}
        className={
          formikProps.touched[field] && formikProps.errors[field] 
            ? 'border-red-500' 
            : 'border-input'
        }
        onBlur={() => formikProps.setFieldTouched(field)}
      />
      {formikProps.touched[field] && formikProps.errors[field] && (
        <Text className="text-xs text-red-500 mt-1">{String(formikProps.errors[field])}</Text>
      )}
    </View>
  );
  
  const renderSelectField = (
    label: string, 
    field: keyof FormValues, 
    options: Array<{ label: string; value: string }>,
    unit: string = '',
    formikProps: FormikProps<FormValues>
  ) => {
    // Use local state to track the open state of the dropdown
    const [open, setOpen] = useState(false);
    
    // Get the current value from formik
    const currentValue = String(formikProps.values[field] || '');
    const selectedOption = options.find(opt => opt.value === currentValue) || options[0];
    
    return (
      <View className="mb-3">
        <Text className="text-sm font-medium text-foreground mb-1.5">{label}{unit ? ` (${unit})` : ''}</Text>
        
        {/* Create a custom select implementation */}
        <View className="relative">
          <View 
            className="flex-row h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2"
            onTouchEnd={() => setOpen(!open)}
          >
            <Text className="text-sm text-foreground">
              {selectedOption.label}
            </Text>
            <ChevronDown size={16} className="text-foreground opacity-50" />
          </View>
          
          {open && (
            <View className="absolute top-11 left-0 right-0 z-50 bg-background border border-input rounded-md shadow-md">
              {options.map((option, index) => (
                <View 
                  key={index}
                  className={`px-3 py-2 border-b border-input ${option.value === currentValue ? 'bg-primary/10' : ''}`}
                  onTouchEnd={() => {
                    formikProps.setFieldValue(field, option.value);
                    setOpen(false);
                  }}
                >
                  <Text 
                    className={`text-sm ${option.value === currentValue ? 'font-semibold text-primary' : 'text-foreground'}`}
                  >
                    {option.label}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        {formikProps.touched[field] && formikProps.errors[field] && (
          <Text className="text-xs text-red-500 mt-1">{String(formikProps.errors[field])}</Text>
        )}
      </View>
    );
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Convert form values to proper types
        const convertedValues: Partial<PredictionInputData> = {};
        
        for (const [key, value] of Object.entries(values)) {
          if (value === '') continue;
          
          if (typeof value === 'boolean') {
            convertedValues[key as keyof PredictionInputData] = value ? 1 : 0;
          } else {
            convertedValues[key as keyof PredictionInputData] = Number(value);
          }
        }
        
        onSubmit(convertedValues);
      }}
    >
      {(formikProps) => (
        <>
          <Card className="mb-6">
            <CardHeader>
              <Text className="text-lg font-semibold text-foreground">Basic Information</Text>
            </CardHeader>
            <CardContent className="gap-2">
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('Age', 'age', 'Enter age', 'years', formikProps)}
                </View>
                <View className="flex-1">
                  {renderTextField('Weight', 'weight', 'Enter weight', 'kg', formikProps)}
                </View>
              </View>
              
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('BMI', 'bmi', 'Enter BMI', 'kg/m²', formikProps)}
                </View>
                <View className="flex-1">
                  {renderSelectField('Blood Group', 'blood_group', bloodGroupOptions, '', formikProps)}
                </View>
              </View>
              
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('Years of Marriage', 'marriage_status', 'Enter years', 'years', formikProps)}
                </View>
                <View className="flex-1">
                  {renderSelectField('Abortions', 'abortions', abortionOptions, '', formikProps)}
                </View>
              </View>
              
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('Hemoglobin', 'hgb', 'Enter value', 'g/dL', formikProps)}
                </View>
                <View className="flex-1">
                  {renderSwitchField('Pregnant', 'pregnant', formikProps)}
                </View>
              </View>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <Text className="text-lg font-semibold text-foreground">Menstrual & Hormonal</Text>
            </CardHeader>
            <CardContent className="gap-2">
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderSelectField('Menstrual Cycle', 'cycler', cyclerOptions, '', formikProps)}
                </View>
                <View className="flex-1">
                  {renderTextField('Cycle Length', 'cycle_length', 'Enter days', 'days', formikProps)}
                </View>
              </View>
              
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('FSH/LH Ratio', 'fsh_lh', 'Enter ratio', '', formikProps)}
                </View>
                <View className="flex-1">
                  {renderTextField('TSH', 'tsh', 'Enter value', 'µIU/mL', formikProps)}
                </View>
              </View>
              
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('AMH', 'amh', 'Enter value', 'ng/mL', formikProps)}
                </View>
                <View className="flex-1">
                  {renderTextField('PRL', 'prl', 'Enter value', 'ng/mL', formikProps)}
                </View>
              </View>
              
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('Vitamin D3', 'vit_d3', 'Enter value', 'ng/mL', formikProps)}
                </View>
                <View className="flex-1">
                  {renderTextField('PRG', 'prg', 'Enter value', 'ng/mL', formikProps)}
                </View>
              </View>
              
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('I-HCG', 'i_hcg', 'Enter value', 'mIU/mL', formikProps)}
                </View>
                <View className="flex-1">
                  {renderTextField('II-HCG', 'ii_hcg', 'Enter value', 'mIU/mL', formikProps)}
                </View>
              </View>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <Text className="text-lg font-semibold text-foreground">Physical Measurements</Text>
            </CardHeader>
            <CardContent className="gap-2">
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('Waist-Hip Ratio', 'waist_hip_ratio', 'Enter ratio', '', formikProps)}
                </View>
                <View className="flex-1">
                  {renderTextField('Random Blood Sugar', 'rbs', 'Enter value', 'mg/dL', formikProps)}
                </View>
              </View>
              
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('BP Systolic', 'bp_systolic', 'Enter value', 'mmHg', formikProps)}
                </View>
                <View className="flex-1">
                  {renderTextField('BP Diastolic', 'bp_diastolic', 'Enter value', 'mmHg', formikProps)}
                </View>
              </View>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <Text className="text-lg font-semibold text-foreground">Ultrasound Findings</Text>
            </CardHeader>
            <CardContent className="gap-2">
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('Follicles (Left)', 'follicle_no_l', 'Enter count', 'count', formikProps)}
                </View>
                <View className="flex-1">
                  {renderTextField('Follicles (Right)', 'follicle_no_r', 'Enter count', 'count', formikProps)}
                </View>
              </View>
              
              <View className="flex-row gap-2">
                <View className="flex-1">
                  {renderTextField('Avg Size (Left)', 'avg_f_size_l', 'Enter size', 'mm', formikProps)}
                </View>
                <View className="flex-1">
                  {renderTextField('Avg Size (Right)', 'avg_f_size_r', 'Enter size', 'mm', formikProps)}
                </View>
              </View>
              
              <View>
                {renderTextField('Endometrium Thickness', 'endometrium', 'Enter thickness', 'mm', formikProps)}
              </View>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <Text className="text-lg font-semibold text-foreground">Symptoms & Lifestyle</Text>
            </CardHeader>
            <CardContent className="gap-2">
              {renderSwitchField('Weight Gain', 'weight_gain', formikProps)}
              {renderSwitchField('Hair Growth', 'hair_growth', formikProps)}
              {renderSwitchField('Skin Darkening', 'skin_darkening', formikProps)}
              {renderSwitchField('Hair Loss', 'hair_loss', formikProps)}
              {renderSwitchField('Pimples', 'pimples', formikProps)}
              {renderSwitchField('Fast Food Regularly', 'fast_food', formikProps)}
              {renderSwitchField('Regular Exercise', 'reg_exercise', formikProps)}
            </CardContent>
          </Card>
          
          <Button 
            className="w-full mb-8" 
            onPress={() => formikProps.handleSubmit()} 
            disabled={isLoading || formikProps.isSubmitting}
          >
            <Text className="text-primary-foreground">
              {isLoading ? 'Predicting...' : 'Submit for Prediction'}
            </Text>
          </Button>
        </>
      )}
    </Formik>
  );
};

export default LabTestPredictionForm; 
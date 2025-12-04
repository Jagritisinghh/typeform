import React,{useState,useEffect,useRef} from 'react'
import { ChevronRight, Send, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';

const steps=[
    {
        id:0,label:'name',type:'text',placeholder:'Write Your Full Name',icon:User,question:"What's your name?"
    },
     {
        id:1,label:'email',type:'email',placeholder:'yourname@gmail.com',icon:Mail,question:"Great! What's your email address?"
    }, {
        id:2,label:'contact',type:'number',placeholder:'95750xxxxx',icon:Phone,question:"And a phone number we can reach you at?"
    }, {
        id:3,label:'message',type:'textarea',placeholder:'Tell us everything...',icon:MessageSquare,question:"Anything else you want to convey?"
    }
]

const initialFormData={
    name:'',
    email:'',
    contact:'',
    message:'',
};

const validateField = (label, value) => {
  if(label==='message') return true;
  if (!value.trim()) return false;
   
  
  if(label==='contact' && value.length!==10) return false;
  
  if (label === 'email') {
    // Basic email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  
  // All other fields just need to be non-empty
  return true;
};

function TypeForm() {
    const [step,setStep]=useState(0);
    const [formData,setFormData]=useState(initialFormData);
      const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentInputRef=useRef(null);

  useEffect(()=>{
    if(step<steps.length){
      currentInputRef.current?.focus();
    }
    setError('');
  },[step]);


   const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (error) {
      setError('');
    }
  };

  const handleNext = () => {
    const currentStep = steps[step];
    const value = formData[currentStep.label];

    if (!validateField(currentStep.label, value)) {
      setError(`Please provide a valid ${currentStep.label}.`);
      return;
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      console.log("Form Data Submitted:", formData);
      setStep(steps.length); 
      setIsSubmitting(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
      if (e.key === 'Enter' && step < steps.length) {
          if (steps[step].type !== 'textarea') {
              e.preventDefault();
              handleNext();
          }
      }
  };

    const isLastStep = step === steps.length - 1;
  const isSuccess = step === steps.length;
    const progress = ((step + 1) / (steps.length + 1)) * 100;



  const InputStyle = "w-full text-2xl md:text-3xl lg:text-4xl p-3 border-b-2 bg-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300 placeholder-white-400";
  const ButtonStyle = "flex items-center space-x-2 px-6 py-3 mt-10 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl disabled:bg-gray-400 disabled:shadow-none";

  return (
    <div className='min-h-screen bg-black flex items-center justify-center p-4'>
        <div className='w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-10 transition-all duration-500 ease-in-out'  style={{ minHeight: '400px' }}>
            {/* progress bar */}
            <div className="h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
                <div className='h-full bg-indigo-500 transition-all duration-700 ease-out'
                style={{width:`${progress}%`}}
                >

                </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} onKeyDown={handleKeyDown} >
                <div className="relative overflow-hidden">
                    {
                        steps.map((stepData,index)=>(
                            <div key={stepData.id}
                              className={`absolute w-full transition-all duration-500 ease-in-out p-1`}
                              style={{
                                transform: `translateY(${(index - step) * 100}%)`,
                                opacity: index === step ? 1 : 0,
                                pointerEvents: index === step ? 'auto' : 'none',
                                position: index === step ? 'relative' : 'absolute',
                              }}>
                                <div className="flex flex-col space-y-4">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{stepData.question}</h2>
                                    <div className="relative flex items-start">
                                        <stepData.icon className="absolute left-3 top-5 text-indigo-400 w-6 h-6"/>
                                        {
                                            stepData.type==='textarea'?(
                                                <textarea id={stepData.label}
                                                value={formData[stepData.label]}
                                                onChange={handleChange}
                                                placeholder={stepData.placeholder}
                                                rows="4"
                                                className={`${InputStyle} pl-12 resize-none`}
                                              />
                                            ):(
                                                <input  id={stepData.label}
                                                type={stepData.type}
                                                value={formData[stepData.label]}
                                                onChange={handleChange}
                                                placeholder={stepData.placeholder}
                                                className={`${InputStyle} text-white pl-12`}
                                                required/>
                                            )
                                        }
                                    </div>
                                    {error && index===step &&(
                                        <p className='text-red-500 text-sm mt-2'>{error}</p>
                                    )}
                                    {/* buttons */}
                                    <button
                                    type="button" 
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className={`${ButtonStyle} ${isLastStep ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}>
                                        {isSubmitting?('Sending...'):isLastStep?(
                                            <>
                                            <Send/>
                                            <span>Submit Form</span>
                                            </>
                                        ):(
                                            <>
                                            
                                            <span>Press Enter or Click Here</span>
                                             <ChevronRight className="w-5 h-5" />
                                            </>

                                        )
                                        }
                                    </button>
                                </div>
                            </div>
                        ))}
{/* success */}
                    <div className={`transition-all duration-500 ease-in-out flex flex-col items-center text-center p-8`}
                    style={{transform:`translateY(${isSuccess?0:100}%)`,
                             opacity:isSuccess?1:0,
                             position:isSuccess?'relative':'absolute',}}>

            <CheckCircle className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
                <h2 className="text-4xl font-extrabold text-white mb-2">Success!</h2>
                <p className="text-xl text-gray-300">
                    Thank you, {formData.name || 'Guest'}! Your message has been received.
                </p>
    
                <button
                    onClick={() => {
                        setStep(0);
                        setFormData(initialFormData);
                    }}
                    className={`${ButtonStyle} bg-gray-500 hover:bg-gray-600`}
                >
                    Start Over
                </button>

                    </div>

                </div>

            </form>
        </div>

    </div>
  )
}

export default TypeForm
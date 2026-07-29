'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CATEGORIES = [
  { label: 'Corporate', fee: 'Rs. 30,000' },
  { label: 'Executive', fee: 'Rs. 5,000' },
  { label: 'Associate', fee: 'Rs. 2,000' },
  { label: 'Overseas', fee: '100 USD' },
  { label: 'Women', fee: 'Rs. 3,000' },
  { label: 'Student', fee: 'Free' },
  { label: 'Honorary Member', fee: 'Free' },
];

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  phoneNo: string;
  emailAddress: string;
  cnicNo: string;
  ntnNumber: string;
  membershipNo: string;
  membershipCategory: string;
  membershipFee: string;
  businessName: string;
  businessType: string;
  photo: string;
}

const INITIAL: FormData = {
  firstName: '', lastName: '',
  address: '', district: '', phoneNo: '', emailAddress: '',
  cnicNo: '', ntnNumber: '', membershipNo: '', membershipCategory: '',
  membershipFee: '', businessName: '', businessType: '', photo: '',
};

// ── Shared print/preview layout ───────────────────────────────────────────────
function FormPreview({ form, innerRef }: { form: FormData; innerRef?: React.Ref<HTMLDivElement> }) {
  const Field = ({ label, value, half }: { label: string; value: string; half?: boolean }) => (
    <div style={{ flex: half ? '0 0 48%' : '1', marginBottom: '18px' }}>
      {/* Label */}
      <div style={{
        fontSize: '10px', color: '#666', fontWeight: '700',
        letterSpacing: '0.6px', textTransform: 'uppercase',
        marginBottom: '4px'
      }}>{label}</div>
      {/* Value text — sits clearly above the line */}
      <div style={{
        fontSize: '13px', color: '#111', letterSpacing: '1.2px',
        lineHeight: '1.5', paddingLeft: '2px',
        marginBottom: '4px',
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        minHeight: '20px',
        textTransform: 'uppercase',
      }}>
        {value || '\u00A0'}
      </div>
      {/* Line as a solid background div — not a CSS border */}
      <div style={{
        height: '1.5px',
        backgroundColor: '#222',
        width: '100%',
        display: 'block',
      }} />
    </div>
  );

  return (
    <div ref={innerRef} style={{ width: '794px', backgroundColor: '#fff',
      fontFamily: 'Arial, sans-serif', padding: '44px', boxSizing: 'border-box' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '26px',
        paddingBottom: '14px', borderBottom: '3px solid #15803d' }}>
        <img src="/logo.jpg" alt="Logo" style={{ width: '76px', height: '76px',
          objectFit: 'contain', marginRight: '18px' }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#15803d',
            letterSpacing: '1.5px', textTransform: 'uppercase', lineHeight: '1.3' }}>
            Chamber of Food and Agriculture,
          </div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#15803d',
            letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '2px' }}>
            Pakistan
          </div>
          <div style={{ fontSize: '12px', color: '#444', marginTop: '6px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Membership Registration Form
          </div>
        </div>
        <div style={{ marginLeft: '18px', textAlign: 'center' }}>
          <div style={{ width: '114px', height: '140px', border: '2px solid #333',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#f5f5f5', overflow: 'hidden', flexShrink: 0 }}>
            {form.photo
              ? <div style={{
                  width: '114px', height: '140px',
                  backgroundImage: `url(${form.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                  backgroundRepeat: 'no-repeat',
                  flexShrink: 0,
                }} />
              : <span style={{ fontSize: '10px', color: '#999', textAlign: 'center', padding: '4px' }}>Passport<br />Photo</span>}
          </div>
          <div style={{ fontSize: '10px', color: '#666', marginTop: '3px' }}>Applicant Photo</div>
        </div>
      </div>

      {/* Fields */}
      <div style={{ display: 'flex', gap: '28px' }}>
        <Field label="Full Name" value={`${form.firstName} ${form.lastName}`.trim()} half />
        <Field label="Membership No." value={form.membershipNo} half />
      </div>
      <Field label="Address" value={form.address} />
      <div style={{ display: 'flex', gap: '28px' }}>
        <Field label="District" value={form.district} half />
        <Field label="Phone Number" value={form.phoneNo} half />
      </div>
      <div style={{ display: 'flex', gap: '28px' }}>
        <Field label="Email Address" value={form.emailAddress} half />
        <Field label="CNIC Number" value={form.cnicNo} half />
      </div>
      <div style={{ display: 'flex', gap: '28px' }}>
        <Field label="NTN Number" value={form.ntnNumber} half />
        <Field label="Business Name" value={form.businessName} half />
      </div>
      <div style={{ display: 'flex', gap: '28px' }}>
        <Field label="Business Type" value={form.businessType} half />
        <Field label="Membership Category" value={form.membershipCategory} half />
      </div>
      <div style={{ display: 'flex', gap: '28px' }}>
        <Field label="Membership Fee" value={form.membershipFee} half />
        <div style={{ flex: '0 0 48%' }} />
      </div>

      {/* Declaration */}
      <div style={{ marginTop: '10px', padding: '11px 13px', border: '1px solid #ccc',
        borderRadius: '4px', backgroundColor: '#fafafa' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#333', marginBottom: '5px',
          textTransform: 'uppercase', letterSpacing: '1px' }}>Declaration</div>
        <p style={{ fontSize: '11px', color: '#555', margin: 0, lineHeight: '1.7' }}>
          I hereby declare that all the information provided above is true and correct to the best of my knowledge.
          I agree to abide by the rules and regulations of the Chamber of Food &amp; Agriculture Pakistan.
        </p>
      </div>

      {/* Applicant Signature on right + Date left + Office Use box below signature */}
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {/* Date left — bottom aligned */}
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#333', whiteSpace: 'nowrap', paddingBottom: '3px' }}>Date:</span>
            <span style={{ fontSize: '11px', color: '#111', letterSpacing: '1px', paddingBottom: '3px', paddingLeft: '4px' }}>
              {new Date().toLocaleDateString('en-PK', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Applicant Signature + For Office Use Only stacked on right */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
          {/* Applicant Signature */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '200px', height: '1.5px', backgroundColor: '#333', marginBottom: '5px' }} />
            <span style={{ fontSize: '10px', color: '#555' }}>Applicant Signature</span>
          </div>
          {/* For Office Use Only box */}
          <div style={{ width: '220px', border: '1px solid #333', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ borderBottom: '1.5px solid #333', fontSize: '10px', fontWeight: '700',
              textAlign: 'center', padding: '3px 8px', letterSpacing: '0.5px', color: '#333',
              backgroundColor: '#fff' }}>
              FOR OFFICE USE ONLY
            </div>
            <div style={{ height: '52px', padding: '6px 8px', backgroundColor: '#fff' }}>
              <div style={{ fontSize: '10px', color: '#555', marginBottom: '20px' }}>President's Signature:</div>
              <div style={{ height: '1.5px', backgroundColor: '#333' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '28px', borderTop: '2px solid #15803d', paddingTop: '9px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '10px', color: '#15803d', fontWeight: 'bold' }}>CFA Pakistan</span>
        <span style={{ fontSize: '10px', color: '#777' }}>info@cfapak.org &nbsp;|&nbsp; www.cfapak.org</span>
        <span style={{ fontSize: '10px', color: '#777' }}>Form No: CFA-MEM-{new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MembershipForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [downloading, setDownloading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Auto capitalize first letter of each word for text fields
    const titleCase = (str: string) => str.replace(/\b\w/g, c => c.toUpperCase());

    if (name === 'cnicNo') {
      const digits = value.replace(/\D/g, '').slice(0, 13);
      let formatted = digits;
      if (digits.length > 5) formatted = digits.slice(0, 5) + '-' + digits.slice(5);
      if (digits.length > 12) formatted = formatted.slice(0, 13) + '-' + digits.slice(12);
      setForm(f => ({ ...f, cnicNo: formatted }));
      setErrors(err => ({ ...err, cnicNo: '' }));
      return;
    }
    if (name === 'membershipCategory') {
      const cat = CATEGORIES.find(c => c.label === value);
      setForm(f => ({ ...f, membershipCategory: value, membershipFee: cat?.fee ?? '' }));
      setErrors(err => ({ ...err, membershipCategory: '' }));
      return;
    }
    // Skip capitalization for email, phone, ntn, cnic
    const skipCapitalize = ['emailAddress', 'phoneNo', 'ntnNumber', 'membershipNo'];
    const newValue = skipCapitalize.includes(name) ? value : titleCase(value);
    setForm(f => ({ ...f, [name]: newValue }));
    setErrors(err => ({ ...err, [name]: '' }));
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(f => ({ ...f, photo: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.district.trim()) e.district = 'Required';
    if (!/^(\+92|0)[0-9]{10}$/.test(form.phoneNo.replace(/\s/g, '')))
      e.phoneNo = 'Valid Pakistani number (03XXXXXXXXX)';
    if (!/^\d{5}-\d{7}-\d$/.test(form.cnicNo))
      e.cnicNo = 'Format: XXXXX-XXXXXXX-X';
    if (!form.membershipCategory) e.membershipCategory = 'Select a category';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleDownload = async () => {
    if (!validate()) return;
    setSubmitted(true);
    await new Promise(r => setTimeout(r, 300));
    setDownloading(true);
    try {
      const el = printRef.current!;
      el.style.visibility = 'visible';
      await new Promise(r => setTimeout(r, 100));
      const canvas = await html2canvas(el, {
        scale: 5, useCORS: true, backgroundColor: '#ffffff',
        logging: false, width: 794, height: el.scrollHeight, windowWidth: 794,
        imageTimeout: 0,
      });
      el.style.visibility = 'hidden';

      // A4 PDF
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      if (imgHeight <= pageHeight) {
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        const scaledWidth = (canvas.width * pageHeight) / canvas.height;
        const xOffset = (pageWidth - scaledWidth) / 2;
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', xOffset, 0, scaledWidth, pageHeight);
      }

      pdf.save(`membership-${form.firstName}-${form.lastName}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  const handleReset = () => { setForm(INITIAL); setErrors({}); setSubmitted(false); };

  const inputCls = (name: keyof FormData) =>
    `w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-all capitalize ${
      errors[name]
        ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
        : 'border-gray-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100'
    }`;

  const Field = (label: string, name: keyof FormData, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
        {label} {props.required !== false && <span className="text-red-500">*</span>}
      </label>
      <input name={name} value={form[name]} onChange={handleChange} className={inputCls(name)} {...props} />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      {/* Hidden element for html2canvas download */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1 }}>
        <FormPreview form={form} innerRef={printRef} />
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 overflow-y-auto py-8 px-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 bg-green-700">
              <span className="text-white font-bold text-lg">Form Preview</span>
              <button
                onClick={() => setShowPreview(false)}
                className="text-white hover:text-green-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Scaled preview */}
            <div className="overflow-auto bg-gray-100 p-4 flex justify-center">
              <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center',
                width: '794px', flexShrink: 0 }}>
                <FormPreview form={form} />
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex gap-3 justify-end px-6 py-4 border-t border-gray-100 bg-white">
              <button
                onClick={() => setShowPreview(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => { setShowPreview(false); handleDownload(); }}
                disabled={downloading}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main layout: form left, live preview right ── */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">

        {/* ── Form Card ── */}
        <div className="w-full xl:w-[520px] flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-green-600 px-8 py-5 flex items-center gap-4">
            <img src="/logo.jpg" alt="CFA Logo" className="h-12 w-12 object-contain rounded-full bg-white p-1 shadow" />
            <div>
              <h1 className="text-white font-bold text-lg tracking-wide">Chamber of Food & Agriculture</h1>
              <p className="text-green-100 text-xs mt-0.5">Membership Registration Form</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* 1. Personal Info */}
            <section>
              <h2 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">1</span>
                Personal Information
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {Field('First Name', 'firstName', { placeholder: 'Muhammad' })}
                {Field('Last Name', 'lastName', { placeholder: 'Ahmad' })}
                {Field('District', 'district', { placeholder: 'Lahore' })}
                {Field('Membership No.', 'membershipNo', { placeholder: 'Auto / Manual', required: false } as any)}
              </div>
              <div className="mt-3">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea name="address" value={form.address} onChange={handleChange} rows={2}
                  placeholder="Street, Area, City"
                  className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-all resize-none ${
                    errors.address ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100'
                  }`} />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 2. Contact */}
            <section>
              <h2 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">2</span>
                Contact Details
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {Field('Phone Number', 'phoneNo', { placeholder: '03001234567', type: 'tel' })}
                {Field('Email Address', 'emailAddress', { placeholder: 'you@example.com', type: 'email', required: false } as any)}
                {Field('CNIC Number', 'cnicNo', { placeholder: '12345-1234567-1', maxLength: 15 })}
                {Field('NTN Number', 'ntnNumber', { placeholder: '1234567-8', required: false } as any)}
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 3. Business */}
            <section>
              <h2 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">3</span>
                Business Information
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {Field('Business Name', 'businessName', { placeholder: 'Company / Farm name', required: false } as any)}
                {Field('Business Type', 'businessType', { placeholder: 'e.g. Agri Farm', required: false } as any)}
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 4. Membership Category */}
            <section>
              <h2 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">4</span>
                Membership Category
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map(cat => (
                  <label key={cat.label} className={`relative flex flex-col p-2.5 rounded-xl border-2 cursor-pointer transition-all
                    ${form.membershipCategory === cat.label
                      ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300 bg-white'}`}>
                    <input type="radio" name="membershipCategory" value={cat.label}
                      checked={form.membershipCategory === cat.label}
                      onChange={handleChange} className="sr-only" />
                    {form.membershipCategory === cat.label && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                    <span className="font-semibold text-xs text-gray-800">{cat.label}</span>
                    <span className="text-xs text-green-600 font-bold mt-0.5">{cat.fee}</span>
                  </label>
                ))}
              </div>
              {errors.membershipCategory && <p className="text-xs text-red-500 mt-1">{errors.membershipCategory}</p>}
            </section>

            <hr className="border-gray-100" />

            {/* 5. Photo */}
            <section>
              <h2 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">5</span>
                Applicant Photo
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-20 h-24 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 flex-shrink-0">
                  {form.photo
                    ? <img src={form.photo} alt="Preview" className="w-full h-full object-cover block" style={{ width: '80px', height: '96px', objectFit: 'cover' }} />
                    : <span className="text-xs text-gray-400 text-center px-1">No photo</span>}
                </div>
                <label className="cursor-pointer inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-all shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                </label>
              </div>
            </section>

            {/* Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowPreview(true)}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold py-2.5 px-4 rounded-xl transition-all text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview Form
                </button>
                <button type="button" onClick={handleDownload} disabled={downloading}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md text-sm">
                  {downloading ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>Generating...</>
                  ) : (
                    <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>Download PDF (A4)</>
                  )}
                </button>
              </div>
              <button type="button" onClick={handleReset}
                className="w-full py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs font-medium transition-all">
                Clear Form
              </button>
              {submitted && !downloading && (
                <p className="text-center text-xs text-green-600 font-medium">✓ Form downloaded successfully!</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Live Preview Panel (desktop) ── */}
        <div className="hidden xl:block flex-1 sticky top-24">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Live Preview</span>
              <span className="text-xs text-gray-400">Updates as you type</span>
            </div>
            <div className="overflow-auto bg-gray-100 p-3">
              <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left',
                width: '794px', flexShrink: 0, pointerEvents: 'none' }}>
                <FormPreview form={form} />
              </div>
              {/* invisible spacer so container has correct height */}
              <div style={{ height: '500px' }} />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

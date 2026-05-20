/**
 * Dole / Agright PoC proposal template — document styling and Exhibit A (Terms of Service).
 * Source: Dole_Agright_Proof of Concept Proposal (May 2025).
 */

/** Primary typeface in the Dole template PDF (Inter family). */
export const DOLE_DOC_FONT = 'Inter';

export const DOLE_FOOTER_LABEL = 'Bespoke Solution Analytics Proposal';

/** Standard Pixxel contact block from the Dole template (page 15). */
export const DOLE_CONTACT_POINTS = [
  { name: 'Alex Koh', title: 'Sales Lead - APAC', email: 'Alex@pixxel.space' },
  { name: 'Raghav Ahuja', title: 'Legal Manager', email: 'raghav@pixxel.co.in' },
  { name: 'Aakash Parekh', title: 'Chief Commercial Officer', email: 'aakash@pixxel.co.in' },
  { name: 'Subash Yeggina', title: 'Senior Research Scientist', email: 'subash@pixxel.co.in' },
];

/**
 * Exhibit A — Terms of Service (verbatim from Dole/Agright template).
 * Only party identification is parameterized: Agright → customer legal name.
 */
export function getExhibitATermsBlocks(customerName) {
  const customer = customerName?.trim() || '[Customer]';

  return [
    {
      kind: 'heading',
      text: 'Exhibit A - Terms of Service',
    },
    {
      kind: 'para',
      text: `These Terms of Service ("Agreement") are hereby incorporated into and shall form an integral part of the Bespoke Solutioning Proposal offered by Pixxel Space Technologies, Inc., a company incorporated under the laws of the State of Delaware, having its principal place of business at 2301, Rosecrans Ave, Suite No. 4150, El Segundo, CA 90245 ("Pixxel"), to ${customer} ("Customer").`,
    },
    {
      kind: 'para',
      text: `WHEREAS, Pixxel agrees to provide bespoke solution analytics services to ${customer}, and ${customer} agrees to receive such services under the terms and conditions set forth herein;`,
    },
    {
      kind: 'heading',
      text: '1. Services',
    },
    {
      kind: 'para',
      text: 'Pixxel shall provide to Customer the bespoke solution analytics services as described under the Proof of Concept Proposal (hereinafter referred to as the "Proposal"). These services may include, but are not limited to, data analytics, insights generation, reporting, and custom analytics solutions.',
    },
    {
      kind: 'heading',
      text: '2. Provision of Information',
    },
    {
      kind: 'para',
      text: 'Customer agrees to provide accurate, timely, and complete geo-coordinates of control sites and non-treated sites, along with the ancillary data required for the production of the data layers outlined within the Proof of Concept Proposal.',
    },
    {
      kind: 'heading',
      text: '3. Payment Terms',
    },
    {
      kind: 'para',
      text: 'In accordance with the Pixxel Early Adopter Program Term Sheet for the services, Customer agrees to pay Pixxel in accordance with the conditions set forth below;',
    },
    {
      kind: 'bullet',
      text: 'Minimum Order Size: 16 sq km per scene (40km x 40km minimum)',
    },
    {
      kind: 'bullet',
      text: 'Pixxel will provide order intake form to capture various imagery parameters',
    },
    {
      kind: 'bullet',
      text: 'Order submission can take place on a rolling period',
    },
    {
      kind: 'bullet',
      text: 'All orders are subject to feasibility check prior to being accepted.',
    },
    {
      kind: 'para',
      text: 'The Client shall be required to make advance payments at the point when imagery tasking order is placed. The amount should cover the full value of the imagery order to be placed by the Client. No order can be placed unless the payment is made in advance. Pixxel will share a monthly usage report and invoice with the Client, detailing the imagery purchased during the month and advances paid shall be adjusted against the invoices raised. Advances not utilized during the month shall be carried forward to the next month and be available for the Client to place orders against.',
    },
    {
      kind: 'heading',
      text: '4. Licensing',
    },
    {
      kind: 'para',
      text: 'Pixxel grants to Customer a non-exclusive, non-transferable license to use any deliverables, models, reports, insights and data ("Deliverables") provided as part of the services, solely for its internal business purposes during the Term of this Agreement.',
    },
    {
      kind: 'para',
      text: 'Customer shall not:',
    },
    {
      kind: 'bullet',
      text: `Copy, modify, distribute, or reverse engineer any Deliverables provided by Pixxel, outside of their partnership with ${customer}.`,
    },
    {
      kind: 'bullet',
      text: 'Use the services for any unlawful purpose or in violation of any applicable law or regulation.',
    },
    {
      kind: 'bullet',
      text: "Sub-license or transfer any rights granted hereunder to any third party without Pixxel's prior written consent.",
    },
    {
      kind: 'heading',
      text: '5. Intellectual Property',
    },
    {
      kind: 'para',
      text: 'Unless otherwise agreed in writing, all intellectual property rights in the Deliverables and any other materials created by Pixxel during the performance of the services, shall remain the exclusive property of Pixxel.',
    },
    {
      kind: 'para',
      text: 'For the purpose of this Agreement, Intellectual Property shall mean any and all tangible and intangible rights including but not limited to: copyrights, trademarks, notices and trade names, patents, utility models, industrial designs, trade secrets, Internet domains, algorithms, formulas, drawings, plans, specifications, data, documentation, software, hardware and any other industrial property.',
    },
    {
      kind: 'para',
      text: 'Pixxel may use aggregated data provided by Customer for the purposes of improving its services or conducting internal analysis.',
    },
    {
      kind: 'heading',
      text: '6. Term',
    },
    {
      kind: 'para',
      text: 'This Agreement shall commence on the Effective Date.',
    },
    {
      kind: 'heading',
      text: '7. Termination',
    },
    {
      kind: 'para',
      text: "In accordance with the Pixxel Early Adopter Program Term Sheet, Either party may terminate the agreement with immediate effect upon material breach of the other Party's obligations, or as provided for hereunder:",
    },
    {
      kind: 'para',
      text: 'The Client may terminate this Agreement by giving 30 days prior written notice, if Pixxel is in default of its obligations under the Service Level Agreements. Pixxel may terminate this agreement by giving 30 days prior written notice if the Client is in default of its Client Obligations. Either Party may terminate this agreement under mutual agreement with the other party.',
    },
    {
      kind: 'para',
      text: 'IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.',
      before: 240,
    },
    {
      kind: 'signaturePixxel',
    },
    {
      kind: 'signatureCustomer',
      customer,
    },
  ];
}

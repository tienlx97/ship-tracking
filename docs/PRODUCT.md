# PRODUCT.md

Product specification for the Contract Builder application.

## 1. Product Goal

Contract Builder helps internal logistics and export staff create complete sales
contract documents from structured input. Users enter project, commercial,
buyer, seller, payment, bank, and shipping information once, then export a
completed contract document using the company's existing Word template layout.

The MVP focuses on contract generation only. Payment requests, proforma
invoices, and PDF export are future document types and are outside the first
implementation scope.

## 2. MVP Document Type

The first supported document is the CIF sale contract based on the provided
BIDV `CIF.docx` template.

MVP output requirements:

- Export format: `.docx`.
- Preserve the structure, legal wording, and formatting of the source template
  as much as practical.
- Replace template variables with user-entered values.
- Keep fixed legal text owned by the template; the application must not
  silently rewrite legal clauses.

Future, non-MVP document/output types:

- Payment request.
- Proforma invoice.
- PDF export.

## 3. Primary User

The primary user is an internal logistics/export staff member responsible for
preparing sales contracts for export projects.

The product should reduce repetitive document editing, prevent missing required
fields, and make payment and shipping details consistent across generated
contracts.

## 4. MVP Workflow

1. User starts a new contract.
2. User fills project and commercial information.
3. User fills buyer, seller, consignee, notify party, bank, port, and delivery
   details.
4. User defines one or more payment milestones.
5. User previews or validates the entered data.
6. User exports a completed `.docx` contract.

## 5. Required Contract Inputs

### Contract Metadata

- Contract drafting date.
- Project name.
- Project code or contract number.
- Export country.
- Quotation date.
- Scope of work.

### Buyer Information

- Company name.
- Representative name.
- Representative position.
- Address.
- Tax code.

### Seller Information

- Company name.
- Representative name.
- Representative position.
- Address.
- Tax code.

### Commercial Terms

- Contract currency.
- Contract value.
- Contract value in words.
- Payment milestones, each with:
  - Milestone name or order.
  - Payment percentage.
  - Calculated payment amount.
  - Payment method: T/T or L/C.
  - Payment condition or timing.

### Bank Information

- Bank preset, such as BIDV or VCB.
- Beneficiary.
- Account number.
- Bank name.
- Branch.
- Bank address.
- SWIFT code.
- Bank code, when applicable.

### Shipping And Delivery

- Consignee.
- Notify party.
- Port of loading.
- Port of destination.
- Delivery term, initially CIF.
- Incoterms version, initially matching the template unless changed by a later
  product requirement.

## 6. Validation And Behavior

- Required fields must be identified before export.
- Payment milestone percentages must total 100%.
- Payment amounts must be calculated from contract value and milestone
  percentages.
- Bank presets should populate standard bank fields but users must be able to
  review the values before export.
- User-entered values must remain separate from fixed legal template wording.
- The exported filename should include the project code or contract number and
  project name.

## 7. Template-Derived Coverage

The CIF contract workflow must cover these fields from the provided template:

- Contract information: drafting date, contract number, project, item/scope,
  and location/export country.
- Buyer and supplier party details.
- Object of contract and quotation date.
- Contract value and payment terms.
- Bank information.
- Required shipping documents.
- Consignee and notify party.
- Port of loading and port of destination.
- Delivery terms, initially CIF.

## 8. Acceptance Criteria

- The product documentation clearly states that the MVP generates sale
  contracts only.
- All required user-provided fields listed above are represented in the product
  spec.
- Payment request, proforma invoice, and PDF export are explicitly marked as
  future scope.
- The CIF template remains the first supported contract template.
- The standard startup path and verification requirements remain documented in
  repo artifacts before implementation work starts.

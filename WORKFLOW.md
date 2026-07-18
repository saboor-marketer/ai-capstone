# WORKFLOW

## AI Prompting Workflow Comparison

This exercise compared the results of using a vague AI prompt versus a detailed, structured prompt to build the same feature: a responsive settings form with client-side validation.

### Round One: Vague Prompt

For the first attempt, I started a new Claude session and used a single, simple prompt: "Create a settings form." I intentionally provided no additional context, requirements, technology stack, accessibility expectations, or validation rules. Claude generated a basic form that worked, but it lacked several important features. There was little validation, limited responsiveness, and no consideration for accessibility. This round took approximately 15 minutes, including reviewing the generated code and confirming that it ran.

### Round Two: Detailed Prompt

For the second attempt, I started a completely new Claude session to avoid carrying over context. My prompt specified that the project used HTML5, CSS3, Bootstrap 5, and JavaScript ES6. I included the required fields, validation rules, responsive layout requirements, accessibility expectations, and asked Claude to first create a short implementation plan. I also requested that it review its own code, identify possible issues, and explain how the validation should be tested. Although writing the prompt took longer, the overall implementation required fewer corrections. This round took approximately 30 minutes.

### Comparison

The second version produced noticeably higher-quality code. It included semantic HTML, proper labels for every input, Bootstrap's responsive grid system, inline validation messages, and improved code organization. The first version contained only a basic layout with minimal validation and required significantly more manual review.

### Accessibility and Edge Cases

The detailed prompt encouraged Claude to include labels, accessible form controls, and a more keyboard-friendly layout. Edge cases such as empty required fields, invalid email addresses, and password confirmation mismatches were handled in the second version but were missing or incomplete in the first version.

### AI Review and Mistakes

During testing, I discovered that Claude initially allowed passwords containing only spaces to pass validation. I corrected the validation logic to trim whitespace before checking the input. This demonstrated the importance of manually verifying AI-generated code rather than assuming it is always correct.

### Lessons Learned

This exercise showed that investing time in writing a detailed prompt significantly reduces review effort and improves the overall quality of the generated code. A structured workflow consisting of planning, implementation, verification, and manual review produces more reliable results than relying on a single vague prompt.

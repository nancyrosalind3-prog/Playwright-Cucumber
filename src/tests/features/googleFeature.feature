Feature: Contact Form Data Driven Testing

  Scenario Outline: Submit valid contact form data
    Given I navigate to the Contact Us page
    When I fill the contact form using "<dataKey>" data
    And I click the Submit button
    Then I should see the contact form success message

    Examples:
      | dataKey        |
      | validContact   |
      | anotherContact |

  Scenario Outline: Submit invalid contact form data
    Given I navigate to the Contact Us page
    When I fill the contact form using "<dataKey>" data
    And I click the Submit button
    Then I should see a contact form validation error

    Examples:
      | dataKey      |
      | invalidEmail |
      | missingEmail |
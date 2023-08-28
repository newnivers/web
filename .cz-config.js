const typeEnums = {
    feat: "A new feature",
    fix: "A bug fix",
    docs: "Documentation only changes",
    style:
      "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
    revert: "Reverts a previous commit",
    perf: "A code change that improves performance",
    refactor: "A code change that neither fixes a bug nor adds a feature",
    config: "A config change or add",
    chore: "Other changes that don't modify src or test files",
  };
  
  const maxSpaceLength = Object.keys(typeEnums).reduce(
    (acc, { length }) => (length > acc ? length : acc),
    0
  );
  
  const commitizenConfig = {
    types: Object.entries(typeEnums).map(([type, description]) => ({
      value: type,
      name:
        `${type}:     ${" ".repeat(maxSpaceLength - type.length)}` + description,
    })),
    allowBreakingChanges: ["feat", "fix"],
    messages: {
      type: "Select the type of change that you are committing:",
      scope: "Denote the scope of this change (optional):",
      subject: "Write a short, imperative tense description of the change:",
      body: 'Provide a longer description of the change (optional). Use "|" to break new line:',
      footer: "Select ISSUES CLOSED? (optional). E.g.: #31, #34:\n",
      confirmCommit: "Are you sure you want to proceed with the commit above?",
    },
  };
  
  module.exports = commitizenConfig;
  
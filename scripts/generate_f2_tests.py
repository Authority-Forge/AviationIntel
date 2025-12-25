import json
import os

def generate_test_file():
    with open('feature_list.json', 'r') as f:
        features = json.load(f)
    
    f2_tests = [t for t in features if t['feature'] == 'F2: Model Selector']
    
    categories = {}
    for test in f2_tests:
        cat = test['category']
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(test)
    
    lines = [
        "/**",
        " * F2: Model Selector - Test Suite",
        " * Total Tests: 50",
        " * Generated from feature_list.json",
        " */",
        "",
        "import { render, screen, fireEvent, waitFor } from '@testing-library/react';",
        "import userEvent from '@testing-library/user-event';",
        "// We will import the component once implemented",
        "// import ModelSelector from '@/components/dashboard/model-selector';",
        "",
        "// Mock the hook for now until implemented",
        "jest.mock('@/hooks/useModelSelection', () => ({",
        "  useModelSelection: jest.fn(() => ({",
        "    selectedModelId: '550e8400-e29b-41d4-a716-446655440001',",
        "    setSelectedModelId: jest.fn(),",
        "    models: [],",
        "    loading: false,",
        "    error: null,",
        "  })),",
        "}));",
        "",
        "describe('F2: Model Selector', () => {",
    ]
    
    for cat, tests in categories.items():
        lines.append(f"  describe('{cat}', () => {{")
        for test in tests:
            lines.append(f"    it('{test['id']} {test['description']}', () => {{")
            lines.append(f"      // Test Type: {test['type']}")
            lines.append("      // Pending implementation")
            lines.append("      expect(true).toBe(false); // Fail by default until implemented")
            lines.append("    });")
        lines.append("  });")
        lines.append("")
    
    lines.append("});")
    
    os.makedirs('__tests__', exist_ok=True)
    with open('__tests__/F2_ModelSelector.test.tsx', 'w') as f:
        f.write('\n'.join(lines))
    
    print(f"Generated test file with {len(f2_tests)} tests")

if __name__ == '__main__':
    generate_test_file()

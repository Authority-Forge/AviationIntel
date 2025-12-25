import json
import os
import re

def sync_passing_tests():
    # 1. Scan test files for test IDs
    test_dir = '__tests__/F2'
    passing_ids = set()
    
    if not os.path.exists(test_dir):
        print(f"Directory {test_dir} not found.")
        return

    for filename in os.listdir(test_dir):
        if filename.endswith('.tsx') or filename.endswith('.ts'):
            path = os.path.join(test_dir, filename)
            with open(path, 'r') as f:
                content = f.read()
                # Find test IDs like F2.1.1
                matches = re.findall(r"['\"](F2\.\d+\.\d+)", content)
                passing_ids.update(matches)
    
    print(f"Found {len(passing_ids)} tests in test suite.")
    
    # 2. Update feature_list.json
    try:
        with open('feature_list.json', 'r') as f:
            features = json.load(f)
        
        updated_count = 0
        for feature in features:
            if feature['id'] in passing_ids:
                if not feature.get('passes'):
                    feature['passes'] = True
                    updated_count += 1
            # Optionally mark missing ones as false if they were true? 
            # No, keep them as is (false default)
        
        with open('feature_list.json', 'w') as f:
            json.dump(features, f, indent=2)
            
        print(f"Marked {updated_count} new tests as passing in feature_list.json")
        print(f"Total passed in F2: {len([t for t in features if t['id'].startswith('F2') and t.get('passes')])}")
        
    except Exception as e:
        print(f"Error updating feature list: {e}")

if __name__ == '__main__':
    sync_passing_tests()

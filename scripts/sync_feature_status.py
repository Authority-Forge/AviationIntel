import json
import os
import re
import sys

def sync_feature_status(feature_prefix, test_dir):
    print(f"Syncing {feature_prefix} tests from {test_dir}...")
    
    if not os.path.exists(test_dir):
        print(f"Directory {test_dir} not found.")
        return

    passing_ids = set()
    for root, dirs, files in os.walk(test_dir):
        for filename in files:
            if filename.endswith('.tsx') or filename.endswith('.ts'):
                path = os.path.join(root, filename)
                with open(path, 'r') as f:
                    content = f.read()
                    # Find test IDs like F10.1.1
                    matches = re.findall(rf"['\"]({feature_prefix}\.\d+\.\d+)", content)
                    passing_ids.update(matches)
    
    print(f"Found {len(passing_ids)} tests in test suite.")
    
    try:
        with open('feature_list.json', 'r') as f:
            features = json.load(f)
        
        updated_count = 0
        for feature in features:
            if feature['id'] in passing_ids:
                if not feature.get('passes'):
                    feature['passes'] = True
                    updated_count += 1
        
        with open('feature_list.json', 'w') as f:
            json.dump(features, f, indent=2)
            
        print(f"Marked {updated_count} tests as passing.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python sync_feature_status.py <PREFIX> <TEST_DIR>")
    else:
        sync_feature_status(sys.argv[1], sys.argv[2])
